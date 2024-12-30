import { Configs, Results, States } from "@/types/Pool"
import { FC, useState } from "react"
import Skeleton from "react-loading-skeleton"
import styles from "../Platform.module.css"
import Countdown from "./Countdown"

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
    }else if(states.stage_ == 0n){
        if (BigInt(now) > configs.time_start) {
        // should be started but isnt
        return <>
            <div className={styles.normal}>
                Starts
            </div>
            <div style={{position:"relative"}} className={styles.big + ' ' + styles.yellow}>
                <div className={styles.crossed}><del>00:00:00</del></div>
                Any moment now
            </div>
        </>
        }else{
            // starts in ..:..
            return <>
                <div className={styles.normal}>
                    Starts in
                </div>
                <div 
                    style={{position:"relative"}} 
                    className={styles.big + ' ' + styles.yellow}>
                    <Countdown 
                        end={parseInt(configs.time_end.toString())} 
                        onComplete={rerender}/>
                </div>
            </>
        }
    }else if (states.stage_ == 1n) {
        if (BigInt(now) > configs.time_end) {
            // should be ended
            return <>
                <div className={styles.normal}>
                    Ends
                </div>
                <div style={{position:"relative"}} className={styles.big + ' ' + styles.yellow}>
                    <div className={styles.crossed}><del>00:00:00</del></div>
                    Any moment now
                </div>
            </>
        }else{
            // ends in ..:..
            return <>
                <div className={styles.normal}>
                    Ends in
                </div>
                <div 
                    style={{position:"relative"}} 
                    className={styles.big + ' ' + styles.yellow}>
                    <Countdown 
                        end={parseInt(configs.time_end.toString())} 
                        onComplete={rerender}/>
                </div>
            </>
        }
    }else if (states.stage_ == 5n) {
        // finished
        return "finished"
    }else{
        // closed and proccessing
        return <>
            <div className={styles.flex}>
                <div className={styles.normal}>
                    The pool is
                </div>
                &nbsp;
                <div className={styles.big +' '+ styles.green}>
                    Closed
                </div>
            </div>
            <div className={styles.normal}>
                Stay tuned for winners list
            </div>
        </>
    }
}
export default Header