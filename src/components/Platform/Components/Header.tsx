import { Configs, Results, States } from "@/types/Pool"
import { FC, useState } from "react"
import Skeleton from "react-loading-skeleton"
import styles from "../Platform.module.css"
import Countdown from "./Countdown"
import { bigIntToFixed } from "@/utils"

type HeaderGuard = {configs: Configs, states: States, results: Results}
const Header : FC<HeaderGuard> = ({configs, states, results}) => {
    const[renderSwitch, setRenderSwitch] = useState<boolean>(false)
    const rerender = () => setRenderSwitch(prev=>prev)

    let now = Math.floor(Date.now()/1000)
    if(states == null){
        // skeleton is okay
        return <>
            <div className={styles.flex}>
                <Skeleton width={50} />
                &nbsp;
                <Skeleton className={styles.big} width={100}/>
            </div>
            <div className={styles.break}></div>
            <Skeleton className={styles.big} width={100}/>
        </>
    }
    const totalraised = results?.max_raised_
        ? results.max_raised_
        : states.raised_
    return(<>
        {/* Total Raised */}
        {
            states.stage_==0n?'':
            <div className={styles.flex+' '+styles.normal}>
                <div>Total Raised:&nbsp;</div>
                <div className={styles.big+' '+styles.color}>
                    {bigIntToFixed(totalraised, 6)}$
                </div>
            </div>
        }
        {/* Time Left */}
        {
            states.stage_!=1n?'':
            <div className={styles.flex}>
                <div className={styles.big+' '+styles.color}>
                    {
                        BigInt(now) > configs.time_end
                            ? <>
                                <span>00</span>
                                <i>:</i>
                                <span>00</span>
                                <i>:</i>
                                <span>00</span>
                            </>
                            : <Countdown 
                                end={parseInt(configs.time_end.toString())} 
                                onComplete={rerender}/>
                    }
                </div>
                <span>
                    &nbsp;
                </span>
                <div className={styles.normal}>
                    to end
                </div>
            </div>
        }
    </>)
}
export default Header