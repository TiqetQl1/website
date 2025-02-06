import { chainData } from "@/statics/poolMakerData";
import { FC } from "react";
import { createThirdwebClient, defineChain, getContract, readContract } from "thirdweb";
import {ClaimButton, ConnectButton, useActiveAccount, useReadContract } from "thirdweb/react"
import styles from "./Minter.module.css"
import Skeleton from "react-loading-skeleton";

const Minter : FC = () => {
    
    const activeAccount = useActiveAccount();

    const CLIENT_ID            = "00e5dd19d3563fc84fbb7f6d2bd54f98"
    const NFT_CONTRACT_ADDRESS = "0x01c6acBC7E8DBD0a2256d0a769d046Cec92E248C"
    
    
    const client = createThirdwebClient({
        clientId: CLIENT_ID,
    })
    const contract = getContract({
      client,
      chain: defineChain(chainData.chainId),
      address: NFT_CONTRACT_ADDRESS,
    })
    const to : string = activeAccount?.address
    const quantity : bigint = 1n
    
    const { data: condition, isPending: isConditionPending } = useReadContract({
        contract,
        method:
            "function getClaimConditionById(uint256 _conditionId) view returns ((uint256 startTimestamp, uint256 maxClaimableSupply, uint256 supplyClaimed, uint256 quantityLimitPerWallet, bytes32 merkleRoot, uint256 pricePerToken, address currency, string metadata) condition)",
        params: [0n],
    })

    const balanceOfMe = useReadContract({
        contract,
        method:
            "function balanceOf(address owner) view returns (uint256)",
        params: [activeAccount?.address],
    })

    const nextIdToClaim = useReadContract({
        contract,
        method:
          "function nextTokenIdToClaim() view returns (uint256)",
        params: [],
      });

    return <section >
        <div className={styles.main}>
            <h3>NFT Zone !</h3>
            <ConnectButton client={client} />
            <div>
                {
                    !nextIdToClaim.isFetched?"Loding":''
                }
            </div>
            <h4>
                Total supply :
                <span>
                    &nbsp;{isConditionPending?<Skeleton />:`${condition.supplyClaimed}/${condition.maxClaimableSupply}`}
                </span>
            </h4>
            {balanceOfMe.isFetched?(balanceOfMe.data===1n
                ?"You already have claimed yours !"
                :
                <ClaimButton
                    contractAddress={NFT_CONTRACT_ADDRESS} // contract address of the NFT Drop
                    chain={defineChain(chainData.chainId)}
                    client={client}
                    claimParams={{
                        type: "ERC721",
                        quantity: 1n, // claim 1 token
                    }}
                    disabled={balanceOfMe.isFetched?(balanceOfMe.data!==0n?true:false):false}
                    >
                    Claim now !
                </ClaimButton>)
                :<Skeleton width={100} height={40}/>}
        </div>
    </section>
}
export default Minter