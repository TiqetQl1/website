import styles from "./Platform.module.css"
import { FC, useRef, useState } from "react"
import SinglePool from "./SinglePool"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { poolMakerContract, provider } from "@/utils/ether"
import Dot from "./Dot";
import useData from "@/hooks/useData";
import usePool from "@/hooks/usePool";
import SinglePoolSkeleton from "./SinglePoolSkeleton";

interface PlatformGuard {
    selectedWallet: EIP6963ProviderDetail
}

const Platform : FC<PlatformGuard> = ({selectedWallet}) => {
    const [pools, isLoading ,retryPools] 
        = useData<string[]>(poolMakerContract.allActives, 5)
    const [slide, setSlide] = useState<number>(0)
    let sliderRef = useRef(null)

    const settings = {
        className: "center",
        infinite: false,
        centerMode: true,
        centerPadding: "0",
        slidesToShow: 1,
        swipeToSlide: true,
        beforeChange: (_now, next)=>setSlide(next)
      };

    return (
        <>
            <section className={styles.platform}>
                {
                    pools?.length 
                        ? <Slider 
                            {...settings} 
                            className={styles.slick} 
                            ref={sliderRef}>
                                {
                                (pools.length>0)
                                ? 
                                pools.map( address => 
                                    <SinglePool 
                                        key={address} 
                                        wallet={selectedWallet} 
                                        pool_address={address}/>)
                                : 
                                <div className={styles.singlePool}>
                                    There are not any pools :(
                                    <button onClick={retryPools}>
                                        Refresh
                                    </button>
                                </div>
                                }
                        </Slider>
                        : (
                        isLoading 
                            ? <Slider
                            {...settings} 
                            className={styles.slick}>
                                <SinglePoolSkeleton />
                            </Slider>
                            :
                            <div className={styles.singlePool}>
                                Unexpected Error
                                <button onClick={retryPools}>
                                    Refresh
                                </button>
                            </div>
                        )
                }
            </section>
            <section className={styles.pagination}>
                <div>
                    Legacy pools
                </div>
                <div className={styles.dots}>
                    { pools?.length ? pools.map((address, index)=> 
                        {
                            const [pool, _1, _2] = usePool(address)
                            return <Dot 
                                key={index}
                                pool={pool} 
                                isActive={slide===index}
                                clickHandler={()=>sliderRef.current.slickGoTo(index)}/>
                        }
                    )
                    : (isLoading ? "Loading ..." : "Err !")}
                </div>
            </section>
        </>
    )
}

export default Platform