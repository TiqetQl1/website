import ActiveAccountContext from "@/Contexts/ActiveAccountContext";
import ConnectedWalletContext from "@/Contexts/ConnectedWalletContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { widthBreakpoint } from "@/statics/configs";
import { chainData } from "@/statics/poolMakerData";
import { CSSProperties, FC, useContext } from "react";
import { createThirdwebClient, defineChain, getContract, readContract } from "thirdweb";
import { claimTo, ClaimToParams } from "thirdweb/extensions/erc721";
import {ClaimButton, ConnectButton, useActiveAccount, useReadContract, useSendTransaction} from "thirdweb/react"

const Minter : FC = () => {
    
    const activeAccount = useActiveAccount();

    const CLIENT_ID            = "00e5dd19d3563fc84fbb7f6d2bd54f98"
    const NFT_CONTRACT_ADDRESS = "0x6E9669b3973B96Cfa935101A28eb6411660Aa297"
    
    
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

    return <section >
        <ConnectButton client={client} />
        <h4>
            Total supply :
            <span>
                &nbsp;{isConditionPending?" ":`${condition.supplyClaimed}/${condition.maxClaimableSupply}`}
            </span>
        </h4>
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
            {balanceOfMe.isFetched?(balanceOfMe.data!==0n?"You have one !":"Claim now !"):"Loading ..."}
        </ClaimButton>
    </section>
}
export default Minter