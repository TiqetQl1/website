import { createContext, Dispatch, SetStateAction } from "react";

type ActiveAccountContextType = [
    string,
    Dispatch<SetStateAction<string>>
]
const ActiveAccountContext 
    = createContext<ActiveAccountContextType>(null)

export default ActiveAccountContext