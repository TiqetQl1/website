import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import styles from "../Platform.module.css"
import { Configs, States } from "@/types/Pool"
import WalletListContext from "@/Contexts/WalletListContext"
import ConnectedWalletContext from "@/Contexts/ConnectedWalletContext"

type BuyGuard = {
    myTickets: bigint,
    configs  : Configs,
    states   : States,
    setToBuy : Dispatch<SetStateAction<number>>
    handler  : (number)=>{},
}
const Buy : FC<BuyGuard> = ({myTickets, configs, states, setToBuy, handler}) => {
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
            setToBuy(defaultValue)
        }else{
            setToBuy(0)
        }
    },[wallet, myTickets])

    if (myTickets==null) {
        return <button onClick={()=>setIsWalletListOpen(true)}>Connect wallet</button>
    }
    


    return (
    <div className="">
        <div>
            <input 
                type="number" 
                {...limits}
                ref={inputRef}
                defaultValue={defaultValue}
                onChange={e=>{setToBuy(parseInt(e.target.value))}} />
        </div>
        <button onClick={()=>handler(BigInt(inputRef.current.value))}>
            Buy
        </button>
    </div>
    )
}

export default Buy