import { Dispatch, SetStateAction, useEffect, useState } from "react"

export type useDataReturnType<T> = [
    T, // data
    boolean,  // loading
    ()=>Promise<void>, // retry
]

type useDataGuard<T> = 
    (
        getter:()=>Promise<T>,
        maxRetrys: number
    ) => useDataReturnType<T>;

function useData<T>(
        getter:()=>Promise<T>, 
        maxRetrys:number = 5
    ) {
    const [trys, setTrys] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<T>()

    const reget = () => {
        console.log("retrying ...")
        getter()
            .then( (res)=>{
                setData(res)
                setIsLoading(false)
            })
            .catch((err)=>{
                console.log(err)
                setTrys(prev=>{
                    if (prev==maxRetrys) {
                        setIsLoading(false)
                        return prev
                    }
                    setTimeout(reget, 2000)
                    return prev+1
                })
            })
    }

    const retry = async()=>{
        await setTrys(1)
        await setIsLoading(true)
    }

    useEffect(()=>{
        if (isLoading) {
            reget()
        }
    },[isLoading])

    const res : useDataReturnType<T> = [
        data,
        isLoading,
        retry,
    ]
    return res
}

export default useData