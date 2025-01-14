/// <reference types="vite-plugin-svgr/client" />

import { DiscoverWalletProviders } from './WalletProviders'
import { formatAddress } from '@/utils'
import LogoutLogo from '@/assets/logout.svg?react'
import WalletLogo from '@/assets/wallet.svg?react'
import TimesLogo from '@/assets/times.svg?react'
import TiQetLogo from '@/assets/Logo/TiQet.svg?react'
import styles from './Header.module.css'
import { FC, useContext, useEffect, useRef } from 'react'
import WalletListContext from '@/Contexts/WalletListContext'
import ConnectedWalletContext from '@/Contexts/ConnectedWalletContext'
import ActiveAccountContext from '@/Contexts/ActiveAccountContext'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { widthBreakpoint } from '@/statics/configs'

const Header : FC = () => {

    const windowsSize = useWindowDimensions()
    const [userAccount, setUserAccount] 
        = useContext(ActiveAccountContext)
    const [selectedWallet, setSelectedWallet] 
        = useContext(ConnectedWalletContext)
    const [isOpen, setIsOpen] 
        = useContext(WalletListContext)

    const logout = () =>{
      setUserAccount('')
      setSelectedWallet(undefined)
    }

    const ToggleWalletList = ()=>setIsOpen(prev=>!prev)

    useEffect(()=>{
        if (userAccount) {
            setIsOpen(false)
        }
    },[userAccount,isOpen])

    return (
        <header>
            <nav className={styles.top}>
                <h1 className={(windowsSize?.width<widthBreakpoint)?styles.small:''}>
                    <TiQetLogo/>
                </h1>
                {userAccount
                    ?
                    <button onClick={logout} className={styles.logout}>
                        <div>
                            <LogoutLogo />
                            <span>&nbsp;Logout</span>
                        </div>
                        <sub>
                            ( {formatAddress(userAccount)} )
                        </sub>
                    </button>
                    :
                    <button className={styles.selectToggle} onClick={ToggleWalletList}>
                        {isOpen ? <TimesLogo /> : <WalletLogo /> }
                        &nbsp;
                        {isOpen ? "Close" : "Connect" }
                    </button>
                }
            </nav>
            <div className={styles.selectWalletList+' '+(isOpen && styles.open).toString()}>
                <div>
                    <h4>
                        Select Your Wallet
                    </h4>
                    <div className={styles.select}>
                        <DiscoverWalletProviders 
                            setSelectedWallet={setSelectedWallet}
                            setUserAccount={setUserAccount}/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header