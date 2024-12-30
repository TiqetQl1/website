import styles from "./Platform.module.css"
import { FC } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const SinglePoolSkeleton 
    : FC = () => {
    return (
        <SkeletonTheme >
        <div className={styles.singlePool}>
            <div className={styles.total}>
                <Skeleton width={50} />
                &nbsp;
                <Skeleton className={styles.big} width={100}/>
            </div>
            <div style={{display:"block", height:"20px"}}></div>
            <Skeleton width={150}/>
            <div style={{display:"block", height:"20px"}}></div>
            <Skeleton count={3}/>
            <div style={{display:"block", height:"20px"}}></div>
            <Skeleton width={100}/>
            <div style={{display:"block", height:"20px"}}></div>
            </div>
        </SkeletonTheme>
    )
}

export default SinglePoolSkeleton