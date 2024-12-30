/// <reference types="vite-plugin-svgr/client" />
import InfiniteLogo from "@/assets/infinite.svg?react"

import { FC } from "react"
import styles from "../Platform.module.css";

type BarGuard = {
    label  : string,
    current: bigint,
    maximum: bigint,
}
const Bar : FC<BarGuard> = ({label, current, maximum}) => {
    const [limitText, limitNum] = (maximum==null || maximum==0n) 
        ? [<InfiniteLogo/>, 0n] 
        : [<span>{maximum.toString()}</span>, maximum]

    const width = limitNum==0n 
        ? 0
        : (Math.max((Number(current) / Number(limitNum)), 1)*100).toFixed()

    return <div className={styles.wrapper}>
        <div className={styles.fill} style={{width:width+"%"}}>&nbsp;</div>
        <div className={styles.label}>
            {label}
        </div>
        <div className={styles.text}>
            {`${current} / ${limitNum.toString()}`}
        </div>
    </div>
}

export default Bar