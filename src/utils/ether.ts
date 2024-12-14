import { ethers } from "ethers"
import {address, chainData} from "@/statics/poolMakerData";
import PoolMakerABI from "@/statics/PoolMakerABI";
import PoolABI from "@/statics/PoolABI";

export const provider = new ethers.JsonRpcProvider(chainData.rpcUrls[0])
export const poolMakerContract = new ethers.Contract(address, PoolMakerABI, provider);

// The wallet should provide signer !!
export const getMyContract = async (wallet: EIP6963ProviderDetail, contract_address, ABI) => {
    const etherProv = new ethers.BrowserProvider(wallet.provider)
    const signer    = await etherProv.getSigner()
    return new ethers.Contract(contract_address, ABI, signer)
}