import { getActivePools, provider } from "@/utils/ether"
import styles from "./Platform.module.css"
import { FC, useEffect, useState } from "react"
import { Configs } from "@/types/Pool"
import Countdown from "./Countdown";
import { formatBalance, switchChain } from "@/utils";
import usePool from "@/hooks/usePool";
import { Contract, ethers } from "ethers";
import PoolABI from "@/statics/PoolABI";

interface PlatformGuard {
    wallet: EIP6963ProviderDetail
}

const Platform : FC<PlatformGuard> = ({wallet}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    
    const [activePoolAddress, setAPD] = useState('')
    const [pool, configs] : [Contract, Configs] = usePool(activePoolAddress, provider)//wallet?.provider ? wallet.provider : provider)

    const [ticketsTotal, setTicketsTotal] = useState<bigint>(null)
    const [totalParticipants, setTotalParticipants] = useState<bigint>(null)
    const [myTickets, setMyTickets] = useState<bigint>(null)

    const buy = async () => {
        if (wallet) {
            // switchChain(wallet)
            const count = 1n
            const etherProv = new ethers.BrowserProvider(wallet.provider)
            const signer    = await etherProv.getSigner()
            const contract  = new ethers.Contract(activePoolAddress, PoolABI, signer);
            const res = await contract.buy_ticket(count, {value: configs.ticket_price_wei})
            console.log(res)
        }
    }

    const reloadStates = () =>{
        // load tickets sold
        pool.tickets_total()
            .then(res=>{
                // console.log(`total ticks ${res}`)
                setTicketsTotal(res)
            })
        // load total particps`
        pool.total_participants()
            .then(res=>{
                // console.log(`total parts ${res}`)
                setTotalParticipants(res)
            })
        // load my tickets
        pool.total_participants()
        .then(res=>{
            // console.log(`total parts ${res}`)
            setTotalParticipants(res)
            })
    }

    useEffect(()=>{
        //request to poolmaker to find active pool
        getActivePools()
            .then(res=>{
                console.log(res)
                setAPD(res[0])
            })
            .catch((err)=>{
                console.error(err)
                setIsLoading(false)
            })
            .finally(()=>{setIsLoading(false)})
            //if not found or not active
        //if active
        // get configs
    },[])

    useEffect(()=>{
        if (pool) {
            reloadStates()
        }
    },[pool])

    return (
        <div className={styles.main + " box"}>
            <Countdown 
                start={Date.now()-18*3600*1000}
                end={Date.now()+6*3600*1000}
                strokeWidth={5}
                lowColor="#f2f2f2"
                highColor="var(--accent-color-dark)"
                />
            <div className={styles.details}>
                <p>
                    <b>
                        {
                        ticketsTotal !== null
                            ? ticketsTotal.toString() 
                            : '?'
                        }
                    </b> 
                    &nbsp;tickets
                </p>
                <p>
                    out of&nbsp;
                    <b>
                        {
                        configs?.max_tickets_total
                            ? configs.max_tickets_total.toString() 
                            : '?'
                        }
                    </b> 
                    &nbsp;tickets
                </p>
                <p>have been <b>sold</b></p>
                <p>
                    to&nbsp;
                    <b>
                        {
                        totalParticipants !== null
                            ? totalParticipants.toString() 
                            : '?'
                        }
                    </b>
                    &nbsp;people
                </p>
                <button onClick={buy}>
                    <p>Buy one for</p>
                    <p>
                        <b>
                            {
                            configs?.ticket_price_wei
                                ? formatBalance(configs.ticket_price_wei)
                                : '?'
                            }
                        </b>
                        <b>&nbsp;QOM</b>
                    </p>
                </button>
                <p>and be the next</p>
                <p><b>WINNER</b></p>
            </div>
        </div>
    )
}

export default Platform