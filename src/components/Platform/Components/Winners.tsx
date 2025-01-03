import { bigIntToFixed, copyToClip, formatAddress } from "@/utils";
import styles from "../Platform.module.css";
import { Configs, Results } from "@/types/Pool"
import Avvvatars from "avvvatars-react";
import { FC, useContext, useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton";
import ActiveAccountContext from "@/Contexts/ActiveAccountContext";

type WinnersGuard = {
    configs: Configs,
    results: Results,
}
const Winners : FC<WinnersGuard> = ({configs, results}) => {
    const oneCut : bigint = BigInt(Math.floor(Number(BigInt(results?.max_raised_)/configs.cut_share)))
    const winnersCut = bigIntToFixed(oneCut*configs.cut_per_winner, 6)
    const holdersCut = bigIntToFixed(oneCut*configs.cut_per_nft   , 6)
    
    const [account, _] = useContext(ActiveAccountContext)
    const accountLower = account.toLowerCase()
    
    const [holdersOpen, setHoldersOpen] = useState<boolean>(false)
    const holdersRef = useRef(null)
    const toggleHolders = ()=>setHoldersOpen(prev=>!prev)

    return <dl className={styles.winners}>
        <dt>
            <h4>
                Winner{configs.winners_count>1n? 's' : ` of ${winnersCut}$`}
            </h4>
            {
                configs.winners_count>1n
                ?<h5>
                    each got {winnersCut}$
                </h5>
                : ''
            }
        </dt>
        <dd>
            <ul>
            {
            results?.max_raised_
                ? results.winners_.map(winner=>winner.toLowerCase()==accountLower
                    ? <Wallet address={winner} avatarValue="You !"/>
                    : <Wallet address={winner}/>
                )
                : Array(configs.winners_count).fill(0n)
                    .map((_,i)=> <li style={{border:"none"}}>
                            <Skeleton className={styles.big} inline={true} />
                        </li>)
            }
            </ul>
        </dd>
        <dt className={styles.holders} onClick={toggleHolders}>
            <div>
                <h4>
                    NFT holders at the time
                </h4>
                <h5>
                    each got {holdersCut}$
                </h5>
            </div>
            <div 
                style={{transform: `rotateZ(${holdersOpen?"270":"90"}deg)`}}
                className={styles.burger}>
                {"->"}
            </div>
        </dt>
        <dd className={styles.holders}>
            <ul 
                ref={holdersRef}
                style={{maxHeight:(holdersOpen
                    ?holdersRef.current.scrollHeight.toString()
                    :'0'
                    )+"px"}}>
            {
            results?.max_raised_
                ? results.nft_holders_.map(winner=>winner.toLowerCase()==accountLower
                    ? <Wallet address={winner} avatarValue="You !"/>
                    : <Wallet address={winner}/>
                )
                : Array(8).fill(0)
                    .map((_,i)=> <li style={{border:"none"}}>
                            <Skeleton className={styles.big} inline={true} />
                        </li>)
            }
            </ul>
        </dd>
    </dl>
}

type WalletGuard = {
    address: string,
    avatarValue?: string,
}
const Wallet : FC<WalletGuard> = ({address, avatarValue}) => {
    const addressText = avatarValue 
        ? avatarValue 
        : formatAddress(address, 4)
    const [text, setText] = useState(addressText)
    useEffect(()=>{setText(addressText)},[address,avatarValue])

    return <li 
        className={styles.address} 
        onMouseEnter={()=>setText("Click to copy")}
        onMouseLeave={()=>setText(addressText)}
        onClick={()=>{
            copyToClip(address)
            setText("Copied !")
            }}>
            <Avvvatars 
                style={avatarValue?"character":"shape"} 
                value={avatarValue?avatarValue:address.slice(2)} />
            <span>
                {text}
            </span>
    </li>
}

export default Winners