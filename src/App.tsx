import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Platform from './components/Platform'


function App() {

  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>('')

  return (
    <>
      <Header 
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        userAccount={userAccount}
        setUserAccount={setUserAccount}/>
      <main>
        <Platform 
          wallet={selectedWallet}/>
      </main>
    </>
  )
}

export default App