import { CSSProperties, FC } from "react"
import styles from "./Text.module.css"

const Text : FC = () => {

    return <section className={styles.sec}>
        <p className={styles.p}>
            You always find yourself thinking, “Come on, this was so obvious!” or “I knew this would happen!” Maybe even, “Why didn’t they just do this?”
            <br />
            Well, now’s your chance to turn those predictions into real money. Bet on real-world events and multi-day lotteries, outsmart the competition, and prove you were right all along. Didn’t win this time? No worries—there’s always another opportunity just around the corner. Built on the fast, low-cost, and powerful <b>QL1</b> blockchain, our platform ensures complete transparency and security, so you can play with confidence.
            <br />
            Fuel your dreams, justify your losses, calm your doubts, confirm your instincts, and take your shot at victory.
            <br />
            All it takes is just one <b>TiQet</b> in your hand!
        </p>
    </section>
}

export default Text