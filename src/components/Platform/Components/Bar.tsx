/// <reference types="vite-plugin-svgr/client" />
import InfiniteLogo from "@/assets/infinite.svg?react"

import { FC } from "react"
import styles from "../Platform.module.css";

type BarGuard = {
    label  : string,
    current: bigint,
    onHold : number,
    maximum: bigint,
}
const Bar : FC<BarGuard> = ({label, current, onHold, maximum}) => {
    const [limitText, limitNum] = (maximum==null || maximum==0n) 
        ? [<InfiniteLogo/>, 0n] 
        : [<span>{maximum.toString()}</span>, maximum]

    const width = limitNum==0n 
        ? 0
        : (Math.min((Number(current) / Number(limitNum)), 1)*100).toFixed()
    const widthOnHold = limitNum==0n 
        ? 0
        : (Math.min(((Number(current)+onHold) / Number(limitNum)), 1)*100).toFixed()
    const onLimit     = Boolean(width=="100")
    const onHoldLimit = Boolean(widthOnHold=="100")

    current = current?current:0n
    const total = 
        onHold
            ? current+BigInt(onHold)
            : current

    return <div className={styles.wrapper+' '+((onLimit||onHoldLimit)?styles.limit:'')} >
        <div 
            className={styles.fill+' '+(onLimit?styles.limit:'')} 
            style={{width:width+"%"}}>
            &nbsp;</div>
        <div 
            className={styles.fill+' '+styles.hold+' '+(onHoldLimit?styles.limit:'')} 
            style={{width:widthOnHold+"%"}}>
            &nbsp;</div>
        <div className={styles.label}>
            {label}
        </div>
        <div className={styles.text}>
            {/* {`${current?current:0}${onHold?(" + "+onHold):''} / ${limitNum.toString()}`} */}
            {limitNum>0 ? `${total} / ${limitNum.toString()}` : total.toString()}
        </div>
    </div>
}

export default Bar