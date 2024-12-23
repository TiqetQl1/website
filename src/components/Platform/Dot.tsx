import { Pool, States } from "@/types/Pool"
import { suppressDecodeError } from "@/utils"
import { FC, useEffect, useState } from "react"

type DotGuard = {
    pool: Pool,
    isActive: boolean,
    clickHandler: ()=>{}
}

const Dot : FC<DotGuard> = ({pool , isActive, clickHandler}) => {
    const [states, setStates] = useState<States>()
    const transform = isActive?"scale(1.5)":"scale(1.0)"
    const backgroundColor = 
        (!states?.stage_||states.stage_==0n) 
            ? "var(--box-shadow)" 
            : ( states.stage_==1n ? "var(--yellow)" : "var(--green)" )

    useEffect(()=>{
        pool
            .states()
            .then(res=>setStates(res))
            .catch(err=>suppressDecodeError(err))
    },[])

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