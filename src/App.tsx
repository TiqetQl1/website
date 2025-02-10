import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Platform from './components/Platform/Platform'
import WalletListContext from './Contexts/WalletListContext'
import ConnectedWalletContext from './Contexts/ConnectedWalletContext'
import ActiveAccountContext from './Contexts/ActiveAccountContext'
import Archive from './components/Archive/Archive'
import Footer from './components/Footer/Footer'
import Text from './components/Text/Text'


function App() {

  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userAccount, setUserAccount] = useState<string>('')

  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false)

  return (
    <ConnectedWalletContext.Provider value={[selectedWallet,setSelectedWallet]}>
    <ActiveAccountContext.Provider value={[userAccount,setUserAccount]}>
    <WalletListContext.Provider value={[isOpen,setIsOpen]}>
      <Header />
      <main>
        <Platform 
          isArchiveOpen={isArchiveOpen}
          setIsArchiveOpen={setIsArchiveOpen}/>
      </main>
      <Archive
        isArchiveOpen={isArchiveOpen}
        setIsArchiveOpen={setIsArchiveOpen}/>
      <Text />
      <Footer />
    </WalletListContext.Provider>
    </ActiveAccountContext.Provider>
    </ConnectedWalletContext.Provider>
  )
}

export default App