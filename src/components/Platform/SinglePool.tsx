import usePool, { usePoolReturnType } from "@/hooks/usePool"
import styles from "./Platform.module.css"
import { FC, useEffect, useRef, useState } from "react"
import { bigIntToFixed, formatAddress, TimeSegments } from "@/utils"

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
    const [myTickets, setMyTickets] = useState<bigint>(0n)
    const [remTime, setRemTime] = useState<TimeSegments>(null)
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


    return (
        <div className={styles.singlePool}>
            {/* Total raised money */}
            <div className={styles.total}>
                <div>
                    Total raised :&nbsp;
                </div>
                <div className={styles.money}>
                    {bigIntToFixed(10n, 6)+'$'}
                </div>
            </div>
            <div className={styles.address}>
                {text || formatAddress(pool_address, 5)}
            </div>
        </div>
    )
}

export default SinglePool