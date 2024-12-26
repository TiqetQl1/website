import styles from "./Platform.module.css"
import { FC, useEffect, useRef, useState } from "react"
import SinglePool from "./SinglePool"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { poolMakerContract } from "@/utils/ether"
import usePool, { usePoolReturnType } from "@/hooks/usePool";
import { Pool } from "@/types/Pool";
import Dot from "./Dot";

interface PlatformGuard {
    selectedWallet: EIP6963ProviderDetail
}

const Platform : FC<PlatformGuard> = ({selectedWallet}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [pools, setPools] = useState<usePoolReturnType[]>([])
    const [slide, setSlide] = useState<number>(0)
    let sliderRef = useRef(null)

    const settings = {
        className: "center",
        infinite: true,
        centerMode: true,
        centerPadding: "0",
        slidesToShow: 1,
        swipeToSlide: true,
        beforeChange: (_now, next)=>setSlide(next)
      };

    useEffect(()=>{
        poolMakerContract
            .allActives()
                .then(res=>{
                    // console.log(res)
                    setPools(res.map(i=> usePool(i)))
                })
                .finally(()=>setLoading(false))
    },[])

    return (
        <>
            <section className={styles.platform}>
                {
                    loading
                    ? <SinglePool text="Retriving active pools ..."/>
                    : pools.length>0
                        ? <Slider 
                            {...settings} 
                            className={styles.slick} 
                            ref={sliderRef}>
                            {pools.map(
                                item => 
                                    <SinglePool 
                                        key={item.pool.address} 
                                        wallet={selectedWallet} 
                                        pool_address={item.pool.address}/>
                            )}
                        </Slider>
                        : <SinglePool text="There are no active pools :("/>
                }
            </section>
            <section className={styles.pagination}>
                <div>
                    Legacy pools
                </div>
                <div className={styles.dots}>
                    {pools.map((item, index)=> 
                        <Dot 
                            key={index}
                            pool={item.pool} 
                            isActive={slide===index}
                            clickHandler={()=>sliderRef.current.slickGoTo(index)}/>)}
                </div>
            </section>
        </>
    )
}

export default Platform