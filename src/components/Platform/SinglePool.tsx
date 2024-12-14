import usePool from "@/hooks/usePool"
import styles from "./Platform.module.css"
import { FC, useEffect, useRef, useState } from "react"
import { usePoolReturnType } from "@/types/Pool"

interface SinglePoolGuard {
    wallet?: EIP6963ProviderDetail,
    pool_address?: string,
    text?: string
}

const SinglePool : FC<SinglePoolGuard> = ({wallet=null, pool_address="0x0000000000000000000000000000000000000000", text=null}) => {
    const {pool, buy, getMyTicketsCount} : usePoolReturnType = usePool(pool_address)
    const [myTickets, setMyTickets] = useState<bigint>(0n)
    const countInputRef = useRef(null)

    const reloadMyTickets = () => {
        getMyTicketsCount(wallet)
            .then(res=>setMyTickets(res))
    }

    const buyHandler = async () => {
        await buy(wallet, countInputRef.current.value)
        reloadMyTickets()
    }

    useEffect(()=>{
        reloadMyTickets()
    },[,wallet])

    useEffect(()=>{
        console.log(myTickets)
    },[myTickets])

    return (
        <section>
            <h4>
                {text ? text : "none"}
            </h4>
            <h4>
                {pool_address}
            </h4>
            <h4>
                {pool?.configs ? pool.configs.organizer : 'loading'}
            </h4>
            {
                pool?.configs
                && <>
                    <input type="number" min={0} max={(BigInt(pool.configs.max_tickets_of_participant) - BigInt(myTickets)).toString()} defaultValue={0} ref={countInputRef} />
                    <button onClick={buyHandler}>Buy</button>
                </>
            }
        </section>
    )
}

export default SinglePool