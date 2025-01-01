import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Platform from './components/Platform/Platform'
import WalletListContext from './Contexts/WalletListContext'
import ConnectedWalletContext from './Contexts/ConnectedWalletContext'


function App() {

  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <ConnectedWalletContext.Provider value={[selectedWallet,setSelectedWallet]}>
    <WalletListContext.Provider value={[isOpen,setIsOpen]}>
      <Header />
      <main>
          <Platform/>
      </main>
    </WalletListContext.Provider>
    </ConnectedWalletContext.Provider>
  )
}

export default App