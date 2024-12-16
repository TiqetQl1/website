import usePool from "@/hooks/usePool"
import { FC, useEffect, useRef, useState } from "react"
import { Configs, Results, States, usePoolReturnType } from "@/types/Pool"
import { suppressDecodeError } from "@/utils"

interface SinglePoolGuard {
    wallet?: EIP6963ProviderDetail,
    pool_address?: string,
    text?: string
}

const SinglePool : FC<SinglePoolGuard> = ({wallet=null, pool_address="0x0000000000000000000000000000000000000000", text=null}) => {
    const {pool, buy, getMyTicketsCount} : usePoolReturnType = usePool(pool_address)
    const [configs, setConfigs] = useState<Configs>()
    const [results, setResults] = useState<Results>()
    const [states, setStates]   = useState<States>()
    const [myTickets, setMyTickets] = useState<bigint>(0n)
    const countInputRef = useRef(null)

    const reloadInfo = (getX:()=>Promise<any>, setX) => getX().then(res=>setX(res)).catch(err=>suppressDecodeError(err))
    const reloadMyTickets = () => getMyTicketsCount(wallet).then(res=>setMyTickets(res))

    const buyHandler = async () => {
        await buy(wallet, countInputRef.current.value, configs.ticket_price_usdt)
        reloadMyTickets()
    }

    useEffect(()=>{
        reloadInfo(pool.configs, setConfigs)
        reloadInfo(pool.results, setResults)
        reloadInfo(pool.states, setStates)
        reloadMyTickets()
        setInterval(()=>reloadInfo(pool.states, setStates),10000)
    },[,wallet])

    useEffect(()=>{
        console.log(myTickets)
    },[myTickets])

    return (
        <div className="singlePool">
            {text || pool_address}
            <br />
            {configs && configs.organizer}
        </div>
    )
}

export default SinglePool