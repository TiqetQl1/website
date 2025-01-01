import PoolABI from "@/statics/PoolABI"
import { qusdtABI, qusdtAddress } from "@/statics/QUSDT"
import { Configs, Pool, Results, States } from "@/types/Pool"
import { switchChain } from "@/utils"
import { getMyContract, provider } from "@/utils/ether"
import { ContractTransactionResponse, ethers } from "ethers"
import { Dispatch, SetStateAction } from "react"

type usePoolReturnType = [
    Pool,
    (
        wallet: EIP6963ProviderDetail, 
        count: bigint, 
        price_per: bigint,
        setStep ?: Dispatch<SetStateAction<Steps>>
    )=>Promise<boolean>,
    (wallet: EIP6963ProviderDetail )=>Promise<bigint>
]

export type Steps = 
    "idle"|
    "Starting process"|
    "Swiching chain"|
    "Requesting allowance"|
    "Calling TiQet"

const usePool = (address: string) => {
    const contract_read = new ethers.Contract(address, PoolABI, provider.provider)
    const states  : () => Promise<States>  = async () => await contract_read.states()
    const results : () => Promise<Results> = async () => await contract_read.results()
    const configs : () => Promise<Configs> = async () => await contract_read.configs()

    const requestUSDTAllowance = async (wallet: EIP6963ProviderDetail, amount: bigint) => {
        const qUSDT = await getMyContract(wallet, qusdtAddress, qusdtABI)
        const spender = address;
        const res
            : ContractTransactionResponse 
            = await qUSDT.approve(spender, amount)
        return ((await res.wait())!=null)
    }

    const buy = async (
        wallet: EIP6963ProviderDetail, 
        count: bigint, 
        price_per: bigint,
        setStep?: Dispatch<SetStateAction<Steps>>) => {
        try{
            setStep && await setStep("Starting process") // 1
            if (!wallet?.provider) {
                throw "wallet not valid"
            }
            setStep && await setStep("Swiching chain") // 2
            await switchChain(wallet)
            setStep && await setStep("Requesting allowance") // 3
            const amount = BigInt(count) * price_per
            if (! await requestUSDTAllowance(wallet, amount)){
                throw "qusdt failed"
            }
            setStep && await setStep("Calling TiQet") // 4
            const my_contract = await getMyContract(wallet, address, PoolABI)
            const res 
                : ContractTransactionResponse 
                = await my_contract.buyTicket(count)
            if (((await res.wait())==null)) {
                throw "Error on TiQet"
            }
        }catch(err){
            setStep && await setStep("idle")
            console.log(err)
            return false
        }
        setStep && await setStep("idle")
        return true
    }

    const getMyTicketsCount = async (wallet: EIP6963ProviderDetail) => {
        if (!wallet?.provider) {
            return 0n
        }
        const accounts: string[] | undefined =
            await (
                wallet.provider
                    .request({ method: 'eth_requestAccounts' })
                    .catch(console.error)
            ) as string[] | undefined;
        return BigInt(await contract_read.tickets_of_participant(accounts[0]))
    }

    const res : usePoolReturnType = [
        {
            address:    address,
            contract:   contract_read,
            configs:    configs,
            states:     states,
            results:    results,
        },
        buy,
        getMyTicketsCount
    ]
    return res
}

export default usePool