import {chainData} from "../statics/poolMakerData"
const _10E15 : bigint = 10n**15n
export const formatBalance = (rawBalance: bigint) => {
  const balance = (parseInt((rawBalance / _10E15).toString())/1000)//.toFixed(3)
  return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0,2) + addr.slice(2)
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
}

export const switchChain = async (wallet: EIP6963ProviderDetail) => {
  const chainId = "0x"+(chainData.chainId).toString(16);
  if (!wallet?.provider) {
    console.error('Bad wallet !')
    return
  }
  try {
    await wallet.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainId }],
    })
  } catch (switchError) {
    // If the chain hasn't been added to the wallet, add it
    if (switchError.code === 4902) {
      try {
        await wallet.provider.request({
          method: 'wallet_addEthereumChain',
          params: [ chainData ],
        })
      } catch (addError) {
        console.error('Failed to add network', addError)
      }
    } else {
      console.error('Failed to switch network', switchError)
    }
  }
}

type TimeSegments = {
  hours: string,
  minutes: string,
  seconds: string,
  milliseconds: string,
}
export const formatTime = (time) : TimeSegments => {
  time = (time/10).toFixed()
  const hours   = String(Math.floor(time / 360000)).padStart(2,"0")
  const minutes = String(Math.floor((time % 360000) / 6000)).padStart(2, "0")
  const seconds = String(Math.floor((time % 6000) / 100)).padStart(2, "0")
  const milliseconds = String(time % 100).padStart(2, "0")
  return {hours, minutes, seconds, milliseconds};
}