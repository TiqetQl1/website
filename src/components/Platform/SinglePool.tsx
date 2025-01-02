import usePool, { Steps } from "@/hooks/usePool"
import styles from "./Platform.module.css"
import { FC, useContext, useEffect, useState } from "react"
import { formatAddress } from "@/utils"
import useData from "@/hooks/useData"
import { Configs, Results, States } from "@/types/Pool"
import SinglePoolSkeleton from "./SinglePoolSkeleton"
import Header from "./Components/Header"
import Bar from "./Components/Bar"
import Buy from "./Components/Buy"
import ConnectedWalletContext from "@/Contexts/ConnectedWalletContext"

interface SinglePoolGuard {
    pool_address: string,
}

const SinglePool 
    : FC<SinglePoolGuard> 
    = ({pool_address,}) => {
    const [pool, buy, getMyTicketsCount] = usePool(pool_address)
    const [myTickets, setMyTickets] = useState<bigint>(null)
    const [toBuy, setToBuy] = useState<number>(0)
    const [configs, isLoadingConfigs ,retryConfigs] = useData<Configs>(pool.configs)
    const [states , isLoadingStates  ,retryStates ] = useData<States> (pool.states )
    const [results, isLoadingResults ,retryResults] = useData<Results>(pool.results)
    const [wallet, _] = useContext(ConnectedWalletContext)
    const [step, setStep] = useState<Steps>("idle")

    const reloadMyTickets = () => 
        getMyTicketsCount(wallet)
            .then(res=>setMyTickets(_prev=>((wallet?.provider)?res:null)))

    const buyHandler = async () => {
        if (step!="idle") {
            return false
        }
        await buy(wallet, BigInt(toBuy), configs.ticket_price_usdt, setStep)
        retryStates()
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
        if (!isLoadingConfigs && !configs?.organizer) {
            setTimeout(retryConfigs, 3000)
        }
    },[isLoadingConfigs])

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
                    step      = {step}
                    toBuy     = {toBuy}
                    setToBuy  = {setToBuy}
                    handler   = {buyHandler}/>
                : ''
            }
            {/* Address */}
            <div className={styles.address}>
                {formatAddress(pool_address, 5)}
            </div>
        </div>
    )
}

export default SinglePool