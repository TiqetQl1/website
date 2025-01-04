/// <reference types="vite-plugin-svgr/client" />
import TimesLogo from '@/assets/times.svg?react'
import styles from "./Archive.module.css";
import useData from "@/hooks/useData";
import { formatAddress } from "@/utils";
import { poolMakerContract } from "@/utils/ether";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import SinglePool from "../Platform/SinglePool";

type ArchiveGuard = {
    isArchiveOpen: boolean,
    setIsArchiveOpen: Dispatch<SetStateAction<boolean>>,
}
const Archive : FC<ArchiveGuard> = ({isArchiveOpen, setIsArchiveOpen}) => {
    const [pools, isLoading ,retryPools] 
        = useData<string[]>(poolMakerContract.allArchived, 5)
    const [current, setCurrent] = useState<string>()
    const clickHandler = (address: string) => setCurrent(prev=>((address==current)?null:address))

    useEffect(()=>{
        setCurrent(null)
    },[isArchiveOpen])

    useEffect(()=>{
        if (!isLoading && pools==null) {
            setTimeout(retryPools, 3000)
        }
    },[isLoading])

    if (!isArchiveOpen) return ''
    
    return <section className={styles.main}>
        <div className={styles.wrapper}>
        <div className={styles.select}>
            <div className={styles.header}>
                <span>
                    Select a pool from the list below to see its history
                </span>
                <span className={styles.times} onClick={()=>setIsArchiveOpen(false)}>
                    <TimesLogo />
                </span>
            </div>
            <ul className={styles.list}>
                {
                ( isLoading
                ? <Skeleton count={5}/>
                : (pools.length>0
                ? <>
                    {pools.map(address=>(
                        <li 
                            onClick={()=>clickHandler(address)}
                            className={(address==current)?styles.active:''}>
                                {formatAddress(address, 6)}
                        </li>
                    ))}
                </>
                : <li>No pools are archived yet</li>))
                }
            </ul>
        </div>
        {
            current==null
                ? ''
                : <SinglePool pool_address={current}/>
        }
        </div>
    </section>
}
export default Archive