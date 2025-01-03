import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Platform from './components/Platform/Platform'
import WalletListContext from './Contexts/WalletListContext'
import ConnectedWalletContext from './Contexts/ConnectedWalletContext'
import ActiveAccountContext from './Contexts/ActiveAccountContext'


function App() {

  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userAccount, setUserAccount] = useState<string>('')

  return (
    <ConnectedWalletContext.Provider value={[selectedWallet,setSelectedWallet]}>
    <ActiveAccountContext.Provider value={[userAccount,setUserAccount]}>
    <WalletListContext.Provider value={[isOpen,setIsOpen]}>
      <Header />
      <main>
          <Platform/>
      </main>
    </WalletListContext.Provider>
    </ActiveAccountContext.Provider>
    </ConnectedWalletContext.Provider>
  )
}

export default App