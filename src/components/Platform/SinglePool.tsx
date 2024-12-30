import usePool from "@/hooks/usePool"
import styles from "./Platform.module.css"
import { FC, useEffect, useRef, useState } from "react"
import { formatAddress } from "@/utils"
import useData from "@/hooks/useData"
import { Configs, Results, States } from "@/types/Pool"
import SinglePoolSkeleton from "./SinglePoolSkeleton"
import Header from "./Components/Header"
import Bar from "./Components/Bar"

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
    const [pool, buy, getMyTicketsCount] = usePool(pool_address)
    const [myTickets, setMyTickets] = useState<bigint>(0n)
    const [configs, isLoadingConfigs ,retryConfigs] = useData<Configs>(pool.configs)
    const [states , isLoadingStates  ,retryStates ] = useData<States> (pool.states )
    const [results, isLoadingResults ,retryResults] = useData<Results>(pool.results)
    const countInputRef = useRef(null)

    const reloadMyTickets = () => getMyTicketsCount(wallet).then(res=>setMyTickets(res))

    const buyHandler = async () => {
        const price = 
            1n
            // configs.ticket_price_usdt
        await buy(wallet, countInputRef.current.value, price)
        reloadMyTickets()
    }

    useEffect(()=>{
        reloadMyTickets()
    },[,wallet])

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
                maximum={configs.max_participants} />
            <Bar 
                label="Tiqets sold"
                current={states?.tickets_sold_} 
                maximum={configs.max_tickets_total} />
            <Bar 
                label="Your tiqets"
                current={myTickets} 
                maximum={configs.max_tickets_of_participant} />
            {/* Buy button */}
            {/* Address */}
            <div className={styles.address}>
                {text || formatAddress(pool_address, 5)}
            </div>
        </div>
    )
}

export default SinglePool