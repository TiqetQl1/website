import { FC, useRef } from "react"
import styles from "../Platform.module.css"

type BuyGuard = {
    current: bigint,
    max    : bigint,
    handler: (number)=>{},
}
const Buy : FC<BuyGuard> = ({current, max, handler}) => {

    const inputRef = useRef(null)

    return (
    <div className="">
        <div>
            <input 
                type="number" 
                min={0} 
                max={Number(max-current)} 
                ref={inputRef} />
        </div>
        <button onClick={()=>handler(BigInt(inputRef.current.value))}>
            Buy
        </button>
    </div>
    )
}

export default Buy