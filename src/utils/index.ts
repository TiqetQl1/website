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

export const formatAddress = (addr: string, show: number = 3) => {
  const upperAfterLastTwo = addr.slice(0,2) + addr.slice(2)
  return `${upperAfterLastTwo.substring(0, show+2)}...${upperAfterLastTwo.substring(addr.length-show)}`
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

export type TimeSegments = {
  hours: string,
  minutes: string,
  seconds: string,
}
export const formatTime = (time) : TimeSegments => {
  const hours   = String(Math.floor(time / 3600)).padStart(2,"0")
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0")
  const seconds = String(Math.floor(time % 60)).padStart(2, "0")
  return {hours, minutes, seconds};
}

export const suppressDecodeError = (error) =>{
  if (error.message.includes("could not decode result data ")) {
    // console.warn("Suppressed decoding error:", error.message);
  } else {
    throw error; // Re-throw if it's a different error
  }
}

export const bigIntToFixed = (value: bigint, decimals: number): string => {
  const strValue = value.toString(); // Convert to string
  const padded = strValue.padStart(decimals + 1, "0"); // Add leading zeros if necessary
  const whole = padded.slice(0, -decimals); // Whole part
  const fractional = padded.slice(-decimals); // Fractional part
  return `${whole}.${fractional}`;
}