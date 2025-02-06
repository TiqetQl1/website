import useWindowDimensions from "@/hooks/useWindowDimensions";
import { widthBreakpoint } from "@/statics/configs";
import { CSSProperties, FC } from "react";

const Minter : FC = () => {
    const dims = useWindowDimensions()
    
    const styles
        : CSSProperties
        = {
            boxSizing: "border-box",
            maxWidth: dims.width>widthBreakpoint?(widthBreakpoint+"px"):"300px",
            width: "100%",
            overflowX: "hidden",
            margin: "40px auto",
            padding: 0,
            boxShadow: "0 0 40px var(--box-shadow)",
            backgroundColor: "var(--background-secondary)",
            height: "650px",
            borderRadius: "28px"
    }

    return <section>
        <iframe
            src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x01c6acBC7E8DBD0a2256d0a769d046Cec92E248C&chain=%7B%22name%22%3A%22QL1%22%2C%22chain%22%3A%22QOM%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Frpc.qom.one%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Shiba+Predator%22%2C%22symbol%22%3A%22QOM%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22qom%22%2C%22chainId%22%3A766%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22ql1%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmRc1kJ7AgcDL1BSoMYudatWHTrz27K6WNTwGifQb5V17D%22%2C%22width%22%3A518%2C%22height%22%3A518%2C%22format%22%3A%22png%22%7D%7D&clientId=00e5dd19d3563fc84fbb7f6d2bd54f98&theme=light&primaryColor=orange"
            title='NFT minter'
            aria-label='NFT minter'
            style={styles}
            height={styles.height}
            width={styles.width}
            frameBorder="0"
        ></iframe>
    </section>
}
export default Minter