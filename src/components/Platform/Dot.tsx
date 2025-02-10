import useData from "@/hooks/useData"
import { Pool, States } from "@/types/Pool"
import { suppressDecodeError } from "@/utils"
import { FC, useEffect, useState } from "react"

type DotGuard = {
    pool: Pool,
    isActive: boolean,
    setAsCurrent: ()=>{}
}

const Dot : FC<DotGuard> = ({pool , isActive, setAsCurrent}) => {
    const [states, isLoading, retry] = useData<States>(pool.states, 5)
    const [movedOnce, setMovedOnce] = useState<boolean>(false)

    useEffect(()=>{
        if (!isLoading && !(states?.stage_)) {
            setTimeout(retry, 10000)
        }
        if (!movedOnce && states?.stage_ && (states.stage_==1n)){
            setMovedOnce(true)
            setAsCurrent()
        }
    },[isLoading])

    const transform = isActive?"scale(1.5)":"scale(1.0)"
    const backgroundColor = 
        (!states?.stage_||states.stage_==0n) 
            ? "var(--box-shadow)" 
            : ( states.stage_==1n ? "var(--yellow)" : "var(--green)" )

    return (
        <div
            className={isActive?"active":undefined}
            onClick={setAsCurrent}>
            <i style={{transform:transform, backgroundColor:backgroundColor}}>
                &nbsp;
            </i>
        </div>
    )
}

export default Dot