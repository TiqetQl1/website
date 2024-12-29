import useData from "@/hooks/useData"
import { Pool, States } from "@/types/Pool"
import { suppressDecodeError } from "@/utils"
import { FC, useEffect, useState } from "react"

type DotGuard = {
    pool: Pool,
    isActive: boolean,
    clickHandler: ()=>{}
}

const Dot : FC<DotGuard> = ({pool , isActive, clickHandler}) => {
    const [states, isLoading, retry] = useData<States>(pool.states, 5)

    useEffect(()=>{
        if (!isLoading && !(states?.stage_)) {
            setTimeout(retry, 10000)
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
            onClick={clickHandler}>
            <i style={{transform:transform, backgroundColor:backgroundColor}}>
                &nbsp;
            </i>
        </div>
    )
}

export default Dot