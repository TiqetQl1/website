import { useSyncProviders } from '@/hooks/useSyncProviders'

export const DiscoverWalletProviders = ({setSelectedWallet,setUserAccount}) => {
  const providers = useSyncProviders()

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    if (!providerWithInfo?.provider) {
      console.warn("wallet not valid")
      return
    }
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

  const useInjectedProvider : ()=>EIP6963ProviderDetail = () => {
    const tmp : EIP6963ProviderDetail = {
      info: {
        name:"injectedProvider",
        walletId: "0", uuid: "0", icon: ""
      },
      provider: (window as any).ethereum
    }
    return tmp
  }

  return (
    <>
      <button onClick={()=>handleConnect(useInjectedProvider())}>
        <div>Injected Provider</div>
      </button>
      {providers?.map((provider: EIP6963ProviderDetail) => (
        <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
          <img src={provider.info.icon} alt={provider.info.name} />
          <div>{provider.info.name}</div>
        </button>
        )) }
    </>
  )
}