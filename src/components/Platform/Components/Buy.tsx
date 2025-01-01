/// <reference types="vite-plugin-svgr/client" />
import InfiniteLogo from "@/assets/infinite.svg?react"

import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import styles from "../Platform.module.css"
import { Configs, States } from "@/types/Pool"
import WalletListContext from "@/Contexts/WalletListContext"
import ConnectedWalletContext from "@/Contexts/ConnectedWalletContext"
import { bigIntToFixed } from "@/utils"
import Skeleton from "react-loading-skeleton"
import { Steps } from "@/hooks/usePool"

type BuyGuard = {
    myTickets: bigint,
    configs  : Configs,
    states   : States,
    step     : Steps,
    toBuy    : number,
    setToBuy : Dispatch<SetStateAction<number>>
    handler  : ()=>{},
}
const Buy : FC<BuyGuard> = ({myTickets, configs, states, step, toBuy, setToBuy, handler}) => {
    const [_, setIsWalletListOpen] = useContext(WalletListContext)
    const [wallet, _setWallet] = useContext(ConnectedWalletContext)
    const inputRef = useRef(null)
    
    // get min & max
    let limits : {min:number, max?:number} = {min:0}
    if (states?.stage_) {
        const isRoomForPerson 
            = ((BigInt(myTickets==null||myTickets==0n)+(states.buyers_count_))<=configs.max_participants);
        if (!isRoomForPerson) {
            limits={min:0, max:0}
        }
        if (configs.max_tickets_of_participant>0n) {
            const roomForPerTiqet 
                = Number((myTickets==null)?0n:(configs.max_tickets_of_participant-myTickets))
            limits.max = 
                (limits?.max)
                    ? Math.min(roomForPerTiqet, limits.max)
                    : roomForPerTiqet
        }
        if (configs.max_tickets_total>0n) {
            const roomForTotTiqet 
                = Number((myTickets==null)?0n:(configs.max_tickets_total-myTickets))
            limits.max = 
                (limits?.max)
                    ? Math.min(roomForTotTiqet, limits.max)
                    : roomForTotTiqet
        }
    }
    const defaultValue = Math.min(1, limits?.max?limits.max:0)
    useEffect(()=>{
        if (wallet?.provider) {
            setToBuyProxy(defaultValue)
        }else{
            setToBuyProxy(0)
        }
    },[wallet, myTickets])
    
    const setToBuyProxy = (newVal) => {
        setToBuy(_prev=>{
            inputRef.current.value = newVal
            return newVal
        })
    }

    const updateToBuyCount = (delta=undefined) =>{
        setToBuy(prev=>{
            let newVal : number = (delta==undefined)
                ? Number(inputRef.current.value)
                : prev+delta
            const res = Math.max(
                limits?.max
                    ? Math.min(limits.max, newVal)
                    : newVal,
                0
            )
            inputRef.current.value = res
            return res
        })
    }

    return (
    <>
    <div 
        style={{display:(wallet?'':'none')}}
        className={styles.buyButton}>
        <div className={styles.count}>
            <div className={styles.change}>
                <div onClick={()=>updateToBuyCount(+1)}>
                    +&nbsp;
                </div>
                {
                    (limits?.max)
                    ? 
                    <div onClick={()=>setToBuyProxy(limits.max)}>
                        {limits.max}
                    </div>
                    :
                    <div>
                        <InfiniteLogo />
                    </div>
                }
            </div>
            <input 
                type="number" 
                {...limits}
                ref={inputRef}
                defaultValue={defaultValue}
                onChange={()=>updateToBuyCount()} />
            <div className={styles.change}>
                <div onClick={()=>updateToBuyCount(-1)}>
                    -
                </div>
                <div onClick={()=>setToBuyProxy(defaultValue)}>
                    {defaultValue}
                </div>
            </div>
        </div>
        <div className={styles.buy+' '+(step!="idle"?styles.ing:'')} onClick={handler}>
            <div className={styles.price}>
                {bigIntToFixed(configs.ticket_price_usdt*BigInt(toBuy), 6)}$
            </div>
            <div className={styles.each+' '+((toBuy==1)?styles.hidden:'')}>
                {bigIntToFixed(configs.ticket_price_usdt, 6)}$ each
            </div>
            <Skeleton inline={true} className={styles.effect} baseColor="transparent" />
            <div className={styles.step}>{step}</div>
        </div>
    </div>
    <button  
        style={{display:(wallet?'none':'')}}
        className={styles.connect}
        onClick={()=>setIsWalletListOpen(true)}>
        Connect to buy
    </button>
    </>
    )
}

export default Buy