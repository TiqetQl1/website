import { useSyncProviders } from '@/hooks/useSyncProviders'

export const DiscoverWalletProviders = ({setSelectedWallet,setUserAccount}) => {
  const providers = useSyncProviders()

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    const accounts: string[] | undefined =
      await (
        providerWithInfo.provider
          .request({ method: 'eth_requestAccounts' })
          .catch(console.error)
      ) as string[] | undefined;

    if (accounts?.[0]) {
      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts[0])
    }else{
      alert("No accounts are logged in the selected wallet")
    }
  }

  return (
    <>
      {
        providers.length > 0
        ? 
          <>
          {providers?.map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          )) }
          {/* {providers?.map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          )) }
          {providers?.map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          )) } */}
          </>
        :
          <div>
            <h4>
              No wallets found
            </h4>
            <p style={{textAlign: "left"}}>
              Please make sure you have wallets installed on this browser or open this page from a wallet's app
            </p>
          </div>
      }
    </>
  )
}