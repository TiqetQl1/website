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
    return false
  }
  try {
    await wallet.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainId }],
    })
  } catch (switchError) {
    // If the chain hasn't been added to the wallet, add it
    const errString = JSON.stringify(switchError)
    if (
      RegExp('\\bwallet_switchEthereumChain\\b').test(errString)
      ||RegExp('\\b4902\\b').test(errString)
      ||RegExp('\\b'+chainId+'\\b').test(errString)
      ||switchError.code == 4902) {
      try {
        await wallet.provider.request({
          method: 'wallet_addEthereumChain',
          params: [ chainData ],
        })
        console.log("here")
      } catch (addError) {
        console.error(switchError)
        throw 'Failed to add network'
      }
    } else {
      console.error(switchError)
      throw 'Failed to switch network'
    }
  }
  return true
}

export type TimeSegments = {
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
}
export const formatTime = (time) : TimeSegments => {
  const days    = String(Math.floor(time / 3600 / 24 ))
  const hours   = String(Math.floor(time / 3600) % 24).padStart(2,"0")
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0")
  const seconds = String(Math.floor(time % 60)).padStart(2, "0")
  return {days, hours, minutes, seconds};
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
  let res = `${whole}.${fractional}`
  let i=res.length-1
  while (res[i]=='0') {
    res = res.slice(0,-1)
    i-=1
  }
  if (res[i]=='.') {
    res = res.slice(0,-1)
  }
  return res;
}

// Copy to clipboard is implemented from this stackoverflow answer
// https://stackoverflow.com/a/30810322/17329401
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea")
  textArea.style.position = 'fixed'
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = "0"
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log(`copied ${text}`);
  } catch (err) {
    console.warn(err);
  }

  document.body.removeChild(textArea);
}
export const copyToClip = (copyText) => {
  if (!navigator.clipboard) {
    // Legacy method (third)
    fallbackCopyTextToClipboard(copyText);
    return;
  }
  // First method
  navigator.clipboard.writeText(copyText).then(
    () => {
      /* clipboard successfully set */
    },
    (err) => {
      // Second method
      window.prompt("The full text to copy : ", copyText);
    },
  )
}