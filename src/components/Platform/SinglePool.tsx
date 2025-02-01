import usePool, { Steps } from "@/hooks/usePool"
import styles from "./Platform.module.css"
import { FC, useContext, useEffect, useState } from "react"
import { copyToClip, formatAddress } from "@/utils"
import useData from "@/hooks/useData"
import { Configs, Results, States } from "@/types/Pool"
import SinglePoolSkeleton from "./SinglePoolSkeleton"
import Header from "./Components/Header"
import Bar from "./Components/Bar"
import Buy from "./Components/Buy"
import ConnectedWalletContext from "@/Contexts/ConnectedWalletContext"
import Winners from "./Components/Winners"
import Skeleton from "react-loading-skeleton"
import Countdown from "./Components/Countdown"

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

    const singlePoolClass = 
        (!states?.stage_||states.stage_==0n) 
            ? styles.notActive
            : ( states.stage_==1n ? styles.active : styles.finished )

    return (
        <div className={
                styles.singlePool+' '+singlePoolClass}>
            <Ribbon states={states} />
            {/* Total raised money w/ remaining time */}
            <Header 
                configs={configs} 
                states={states} 
                results={results} />
            {/* Bars */}
            <div className={styles.bars}>
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
            </div>
            {/* Buy button */}
            {
                ((states==null)
                ? <Skeleton className={styles.big} width={200}/>
                :((states.stage_ <= 0n)
                ? <CountToStart configs={configs} />
                :((states.stage_ <= 1n)
                ? <Buy 
                    myTickets = {myTickets}
                    configs   = {configs}
                    states    = {states}
                    step      = {step}
                    toBuy     = {toBuy}
                    setToBuy  = {setToBuy}
                    handler   = {buyHandler}/>
                : <Winners configs={configs} results={results}/>
                )))
            }
            {/* Address */}
            <Address pool_address={pool_address} />
        </div>
    )
}

type CountToStartGuard = {
    configs: Configs,
}
const CountToStart : FC<CountToStartGuard> = ({configs}) => {
    let now = Math.floor(Date.now()/1000)

    return <div className={styles.flex}>
        <div 
            className={styles.big}
            style={{color:"var(--yellow)"}}>
            {
                BigInt(now) > configs.time_start
                    ? <>
                        <span>00</span>
                        <i>:</i>
                        <span>00</span>
                        <i>:</i>
                        <span>00</span>
                    </>
                    : <Countdown 
                        end={parseInt(configs.time_start.toString())}/>
            }
        </div>
        <span>
            &nbsp;
        </span>
        <div className={styles.normal}>
            to start
        </div>
    </div>
}

type AddressGuard = {pool_address: string}
const Address : FC<AddressGuard> = ({pool_address}) => {
    const addressText = formatAddress(pool_address, 5)
    const [text, setText] = useState(formatAddress(pool_address, 5))

    return <div 
        className={styles.address} 
        onMouseEnter={()=>setText("Click to copy")}
        onMouseLeave={()=>setText(addressText)}
        onClick={()=>{
            copyToClip(pool_address)
            setText("Copied !")
            }}>
            {text}
    </div>
}

type RibbonGuard = {
    states: States,
}
const Ribbon : FC<RibbonGuard> = ({states}) => {
    const [some, setSome] = useState<number>(0)
    let stateString
    if (states!=null) {
        if (states.stage_<=0n) {
            stateString = "Not started yet"
        }else if (states.stage_<=2n) {
            stateString = "Buy NOW"
        }else{
            stateString = "Has ended !"
        }
    }else{
        return ''
    }
    return <div 
        style={{backgroundColor: "var(--theme)"}}
        className={styles.normal+' '+styles.ribbon}>
        {Array(10).fill(0).map(_=><span>{stateString}</span>)}
    </div>
}
export default SinglePool