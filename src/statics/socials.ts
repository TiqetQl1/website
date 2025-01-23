/// <reference types="vite-plugin-svgr/client" />
import SocialsX from "../assets/socials/X.svg?react"
import SocialsTelegram from "../assets/socials/Telegram.svg?react"
import SocialsGitHub from "../assets/socials/GitHub.svg?react"

import { FC, SVGProps } from 'react'

export type Social = {
    name: string,
    username: string,
    logo: FC<SVGProps<SVGSVGElement>>,
    url: string,
}
export const socials : Social[] = [
    {
        name: "X",
        username: "tiqetql1",
        logo: SocialsX,
        url: "https://x.com/tiqetql1?s=21"
    },
    {
        name: "Telegram",
        username: "Tiqetql1",
        logo: SocialsTelegram,
        url: "https://t.me/Tiqetql1"
    },
    {
        name: "GitHub",
        username: "TiqetQl1",
        logo: SocialsGitHub,
        url: "https://github.com/TiqetQl1"
    },
]