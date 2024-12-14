import { Pool } from "@/types/Pool"
import { FC, useEffect, useState } from "react"
import SinglePool from "./SinglePool"
import usePool from "@/hooks/usePool"
import { ethers } from "ethers"
import { address, chainData } from "@/statics/poolMakerData"
import PoolMakerABI from "@/statics/PoolMakerABI"
import { poolMakerContract } from "@/utils/ether"

interface PlatformGuard {
    selectedWallet: EIP6963ProviderDetail
}

const Platform : FC<PlatformGuard> = ({selectedWallet}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [pools, setPools] = useState<string[]>([])


    useEffect(()=>{
        poolMakerContract
            .allActives()
                .then(res=>{
                    console.log(res)
                    setPools(res)
                })
                .finally(()=>setLoading(false))
    },[])

    return (
        <>
            {
                loading
                ? <SinglePool text="Retriving active pools ..."/>
                : pools.length>0
                    ? pools.map(
                        pool_address => 
                            <SinglePool key={pool_address} wallet={selectedWallet} pool_address={pool_address}/>
                    )
                    : <SinglePool text="There are no active pools :("/>
            }
        </>
    )
}

export default Platform