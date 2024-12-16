/// <reference types="vite-plugin-svgr/client" />

import { DiscoverWalletProviders } from './WalletProviders'
import { formatAddress } from '@/utils'
import LogoutLogo from '@/assets/logout.svg?react'
import WalletLogo from '@/assets/wallet.svg?react'
import TimesLogo from '@/assets/times.svg?react'
import styles from './Header.module.css'
import { useEffect, useState } from 'react'

const Header = ({
    selectedWallet, setSelectedWallet,
    userAccount, setUserAccount
    }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const logout = () =>{
      setUserAccount('')
      setSelectedWallet(undefined)
    }

    useEffect(()=>{
        if (userAccount) {
            setIsOpen(false)
        }
    },[userAccount])

    return (
        <header>
            <nav className={styles.top}>
                <h1>
                    TiQet
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
                    <button className={styles.selectToggle} onClick={()=>{setIsOpen(prev=>!prev)}}>
                        {isOpen ? <TimesLogo /> : <WalletLogo /> }
                        &nbsp;
                        {isOpen ? "Close" : "Connect" }
                    </button>
                }
            </nav>
            <div className={styles.selectWalletList+' '+(isOpen && styles.open)}>
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