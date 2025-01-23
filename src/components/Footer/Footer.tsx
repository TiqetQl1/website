/// <reference types="vite-plugin-svgr/client" />
import DownloadLogo from "@/assets/Download.svg?react";
import { FC } from "react"
import { Social, socials } from "@/statics/socials"

import "./Footer.css"

const Footer : FC = () => {
    return <footer>
        <div>
            <a className="whitepaper" href="/assets/TiQetWhitePaper.pdf" download={true}>
                <DownloadLogo/>
                White paper
            </a>
            <ul className="socials">
                {socials.map(item=><ASocialLink item={item}/>)}
            </ul>
        </div>
    </footer>
}

type ASocialLinkGuard = {
    item: Social
}
const ASocialLink : FC<ASocialLinkGuard> = ({item}) => {
    return <li>
        <a className={item.name} href={item.url} target="_blank">
            <item.logo />
        </a>
    </li>
}

export default Footer