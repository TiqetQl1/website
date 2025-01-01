import { createContext, Dispatch, SetStateAction } from "react";

type ConnectedWalletContextType = [
    EIP6963ProviderDetail,
    Dispatch<SetStateAction<EIP6963ProviderDetail>>
]
const ConnectedWalletContext 
    = createContext<ConnectedWalletContextType>(null)

export default ConnectedWalletContext