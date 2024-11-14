import { ethers } from "ethers"
import { formatBalance } from ".";
import {address, chainData} from "@/statics/poolMakerData";
import PoolMakerABI from "@/statics/PoolMakerABI";

export const provider = new ethers.JsonRpcProvider(chainData.rpcUrls[0])
export const poolMakerContract = new ethers.Contract(address, PoolMakerABI, provider);

// export const retriveBalance = async (address: string) => {
//     const balance = (await provider.getBalance(address))
//     console.log(formatBalance(balance))
// }

export const getActivePools = async () : Promise<string[]> => {
    return (await poolMakerContract.all_actives())
}