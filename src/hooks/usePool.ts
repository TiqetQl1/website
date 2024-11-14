import PoolABI from "@/statics/PoolABI"
import { Configs } from "@/types/Pool"
import { Contract, ethers } from "ethers"
import { useEffect, useState } from "react"

const usePool = (address: string, provider) : [Contract, Configs] => {
    const [pool, setPool] = useState<Contract>(null)
    const [configs, setConfigs] = useState<Configs>(null)
    
    useEffect(()=>{
        if (address) {
            setPool(new ethers.Contract(address, PoolABI, provider))
        }
    },[address])

    useEffect(() => {
        if (pool) {
            pool.config()
                .then(res=>setConfigs(res))
        }
    },[pool])

    useEffect(()=>{
        console.log(configs?.organizer ? configs : " not yet ")
    },[configs])

    return [pool, configs]
}

export default usePool