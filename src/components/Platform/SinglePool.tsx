import usePool from "@/hooks/usePool"
import styles from "./Platform.module.css"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { formatAddress } from "@/utils"
import useData from "@/hooks/useData"
import { Configs, Results, States } from "@/types/Pool"
import SinglePoolSkeleton from "./SinglePoolSkeleton"
import Header from "./Components/Header"
import Bar from "./Components/Bar"
import Buy from "./Components/Buy"
import ConnectedWalletContext from "@/Contexts/ConnectedWalletContext"

interface SinglePoolGuard {
    pool_address?: string,
    text?: string
}

const SinglePool 
    : FC<SinglePoolGuard> 
    = ({
        pool_address="0x0000000000000000000000000000000000000000", 
        text=null
    }) => {
    const [pool, buy, getMyTicketsCount] = usePool(pool_address)
    const [myTickets, setMyTickets] = useState<bigint>(null)
    const [toBuy, setToBuy] = useState<number>(11)
    const [configs, isLoadingConfigs ,retryConfigs] = useData<Configs>(pool.configs)
    const [states , isLoadingStates  ,retryStates ] = useData<States> (pool.states )
    const [results, isLoadingResults ,retryResults] = useData<Results>(pool.results)
    const [wallet, _] = useContext(ConnectedWalletContext)
    const inputRef = useRef(null)

    const reloadMyTickets = () => getMyTicketsCount(wallet).then(res=>setMyTickets(res))

    const buyHandler = async (count: bigint) => {
        await buy(wallet, count, configs.ticket_price_usdt)
        reloadMyTickets()
        setTimeout(reloadMyTickets, 5000)
        setTimeout(reloadMyTickets, 10000)
        setTimeout(reloadMyTickets, 20000)
    }

    useEffect(()=>{
        if (wallet?.provider) {
            reloadMyTickets()
        }else{
            setMyTickets(null)
        }
    },[,wallet])

    useEffect(()=>{
        if (isLoadingStates || isLoadingResults) {
            return
        }
        if (states==null || states.stage_ < 5n) {
            setTimeout(retryStates, 3000)
        }
        if (states?.stage_ > 3n) {
            setTimeout(retryResults, 3000)
        }
        return
    },[isLoadingStates,isLoadingResults])

    if(isLoadingConfigs && !(configs?.organizer)) 
        return <SinglePoolSkeleton />

    return (
        <div className={
                styles.singlePool+' '+
                (states?.stage_==1n ? styles.active : '')}>
            {/* Total raised money w/ remaining time */}
            <Header 
                configs={configs} 
                states={states} 
                results={results} />
            {/* Bars */}
            <Bar 
                label="Participents"
                current={states?.buyers_count_} 
                onHold={Number(myTickets!=null && myTickets==0n && toBuy!=0)}
                maximum={configs.max_participants} />
            <Bar 
                label="Tiqets sold"
                current={states?.tickets_sold_} 
                onHold={toBuy}
                maximum={configs.max_tickets_total} />
            <Bar 
                label="Your tiqets"
                current={myTickets} 
                onHold={toBuy}
                maximum={configs.max_tickets_of_participant} />
            {/* Buy button */}
            {
                (states?.stage_ == 1n)
                ? <Buy 
                    myTickets = {myTickets}
                    configs   = {configs}
                    states    = {states}
                    setToBuy  = {setToBuy}
                    handler   = {buyHandler}/>
                : ''
            }
            {/* Address */}
            <div className={styles.address}>
                {text ? text : formatAddress(pool_address, 5)}
            </div>
        </div>
    )
}

export default SinglePool