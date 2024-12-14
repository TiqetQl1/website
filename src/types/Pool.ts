import { Contract } from "ethers"

export type Configs = {
    organizer : string,
    time_end : bigint,
    time_start : bigint,
    ticket_price_usdt: bigint,
    max_tickets_total : bigint,
    max_tickets_of_participant : bigint,
    winners_count : bigint,
    cut_share: bigint,
    cut_per_nft : bigint,
    cut_per_winner : bigint,
}

export type States = {
    stage: number,
    tickets_sold: bigint,
    buyers_count: bigint
}

export type Results = {
    nft_holders: string[],
    winners: string[],
    winners_codes: bigint[]
}

export type Pool = {
    address: string,
    contract: Contract,
    configs: Configs,
    states: States,
    results: Results
}

export type usePoolReturnType = {
    pool: Pool,
    buy: (wallet: EIP6963ProviderDetail, count: bigint)=>Promise<boolean>
    getMyTicketsCount: (wallet: EIP6963ProviderDetail )=>Promise<bigint>
}