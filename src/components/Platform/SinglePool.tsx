import usePool from "@/hooks/usePool"
import styles from "./Platform.module.css"
import { FC, useEffect, useRef, useState } from "react"
import { Configs, Results, States, usePoolReturnType } from "@/types/Pool"
import { bigIntToFixed, formatAddress, formatTime, suppressDecodeError, TimeSegments } from "@/utils"

interface SinglePoolGuard {
    wallet?: EIP6963ProviderDetail,
    pool_address?: string,
    text?: string
}

const SinglePool 
    : FC<SinglePoolGuard> 
    = ({
        wallet=null, 
        pool_address="0x0000000000000000000000000000000000000000", 
        text=null
    }) => {
    const {pool, buy, getMyTicketsCount} : usePoolReturnType = usePool(pool_address)
    const [configs, setConfigs] = useState<Configs>()
    const [results, setResults] = useState<Results>()
    const [states, setStates]   = useState<States>()
    const [myTickets, setMyTickets] = useState<bigint>(0n)
    const [poolTotal, setPoolTotal] = useState<bigint>(0n)
    const [remTime, setRemTime] = useState<TimeSegments>()
    const countInputRef = useRef(null)

    const reloadInfo = (getX:()=>Promise<any>, setX) => getX().then(res=>setX(res)).catch(err=>suppressDecodeError(err))
    const reloadMyTickets = () => getMyTicketsCount(wallet).then(res=>setMyTickets(res))
    const reloadTimeLeft = () => {
        const now = parseInt((Date.now()/1000).toFixed())
        const secondsRem = (configs?.time_end ?  parseInt(configs.time_end.toString()) : now )-now
        setRemTime(formatTime(secondsRem))
    }

    const buyHandler = async () => {
        await buy(wallet, countInputRef.current.value, configs.ticket_price_usdt)
        reloadMyTickets()
    }

    useEffect(()=>{
        reloadInfo(pool.configs, setConfigs)
        reloadInfo(pool.results, setResults)
        reloadInfo(pool.states, setStates)
        reloadInfo(pool.contract.poolTotal, setPoolTotal)
        let getStatesInterval = setInterval(()=>{
            reloadInfo(pool.states, setStates)
            reloadInfo(pool.contract.poolTotal, setPoolTotal)
        },10000)
        let remTimeInterval = setInterval(reloadTimeLeft,1000)
        return ()=>{
            clearInterval(getStatesInterval)
            clearInterval(remTimeInterval)
        }
    },[])

    useEffect(()=>{
        reloadMyTickets()
    },[,wallet])


    return (
        <div className={styles.singlePool}>
                {/* Total raised money */}
                <div className={styles.total}>
                    {
                    ( states?.stage_ && states.stage_ != 0n )
                    ?
                    <>
                        <div>
                            Total raised :&nbsp;
                        </div>
                        <div className={styles.money}>
                            {bigIntToFixed(poolTotal, 6)+'$'}
                        </div>
                    </>
                    :
                    <>
                        <div>
                            Not started&nbsp;
                        </div>
                        <div>
                            YET
                        </div>
                    </>
                    }
                </div>
            <div>
                {states?.stage_ && states.stage_.toString()}
            </div>
            <div className={styles.countdown}>
                {(Date.now()/1000).toFixed()}<br/>
                <br />
                {configs && configs.time_end.toString()}
                <br />
                {remTime && remTime.days+':'+remTime.hours+':'+remTime.minutes+':'+remTime.seconds}
            </div>
            <div className={styles.address}>
                {text || formatAddress(pool_address, 5)}
            </div>
        </div>
    )
}

export default SinglePool