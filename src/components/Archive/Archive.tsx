import useData from "@/hooks/useData";
import { poolMakerContract } from "@/utils/ether";
import { Dispatch, FC, SetStateAction } from "react";

type ArchiveGuard = {
    isArchiveOpen: boolean,
    setIsArchiveOpen: Dispatch<SetStateAction<boolean>>,
}
const Archive : FC<ArchiveGuard> = ({isArchiveOpen, setIsArchiveOpen}) => {
    const [pools, isLoading ,retryPools] 
        = useData<string[]>(poolMakerContract.allArchived, 5)

    if (!isArchiveOpen) return ''
    
    return <section>
        {
            isLoading
            ? <div>loading</div>
            :<ul>
                {pools.map(address=><li>{address}</li>)}
            </ul>
        }
    </section>
}
export default Archive