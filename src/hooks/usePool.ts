import PoolABI from "@/statics/PoolABI"
import { qusdtABI, qusdtAddress } from "@/statics/QUSDT"
import { Configs, Pool, Results, States } from "@/types/Pool"
import { switchChain } from "@/utils"
import { getMyContract, provider } from "@/utils/ether"
import { ethers } from "ethers"

type usePoolReturnType = [
    Pool,
    (wallet: EIP6963ProviderDetail, count: bigint, price: bigint)=>Promise<boolean>,
    (wallet: EIP6963ProviderDetail )=>Promise<bigint>
]

const usePool = (address: string) => {
    const contract_read = new ethers.Contract(address, PoolABI, provider.provider)
    const states  : () => Promise<States>  = async () => await contract_read.states()
    const results : () => Promise<Results> = async () => await contract_read.results()
    const configs : () => Promise<Configs> = async () => await contract_read.configs()

    const requestUSDTAllowance = async (wallet: EIP6963ProviderDetail, amount: bigint) => {
        if (!wallet?.provider) {
            return false
        }
        const qUSDT = await getMyContract(wallet, qusdtAddress, qusdtABI)
        const spender = address;
        const res = await qUSDT.approve(spender, amount)
        console.log(res)
        return res
    }

    const buy = async (wallet: EIP6963ProviderDetail, count: bigint, price: bigint) => {
        console.log("start of buy :")
        console.log("checking wallet")
        if (!wallet?.provider) {
            console.log("wallet not valid")
            return false
        }
        console.log("swiching chain")
        switchChain(wallet)
        console.log("making amount")
        const amount = BigInt(count) * price
        console.log("requesting allowance")
        if (! await requestUSDTAllowance(wallet, amount)){
            console.log("failed")
            return false;
        }
        console.log("making contract")
        const my_contract = await getMyContract(wallet, address, PoolABI)
        console.log("calling buy")
        const res = await my_contract.buyTicket(count)
        console.log(res)
        console.log("--- end of buy")
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
        console.log("account : ", accounts[0])
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