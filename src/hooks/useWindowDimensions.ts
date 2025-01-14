import { useEffect, useState } from "react";

type windowDimensionsType = {
    width: number,
    height: number,
}
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] 
        = useState<windowDimensionsType>({
            width: window.innerWidth,
            height: window.innerHeight,
        })

    useEffect(() => {
        const handleResize = () => {
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        })}
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
};
  
  export default useWindowDimensions;