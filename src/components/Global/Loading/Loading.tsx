/// <reference types="vite-plugin-svgr/client" />

import QBorder from "./Loading.svg?react"
import styles from "./Loading.module.css"

import { FC } from "react"

const Loading : FC = () => {
    return <div className={styles.loading}>
        <QBorder />
    </div>
}
export default Loading