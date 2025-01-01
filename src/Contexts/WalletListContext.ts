import { createContext, Dispatch, SetStateAction } from "react";

type WalletListContextType = [
    boolean,
    Dispatch<SetStateAction<boolean>>
]
const WalletListContext 
    = createContext<WalletListContextType>(null)

export default WalletListContext