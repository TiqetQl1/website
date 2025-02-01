import { CSSProperties, FC } from "react"
import styles from "./Text.module.css"

const Text : FC = () => {

    return <section className={styles.sec}>
        <div className={styles.p}>
            <p>
            You always find yourself thinking, “Come on, this was so obvious!” or “I knew this would happen!” Maybe even, “Why didn’t they just do this?”
            </p>
            <p>
                Well, now’s your chance to turn those predictions into real money. Bet on real-world events and multi-day lotteries, outsmart the competition, and prove you were right all along. Didn’t win this time? No worries—there’s always another opportunity just around the corner. Built on the fast, low-cost, and powerful <b>QL1</b> blockchain, our platform ensures complete transparency and security, so you can play with confidence.
            </p>
            <p>
                Fuel your dreams, justify your losses, calm your doubts, confirm your instincts, and take your shot at victory.
            </p>
            <p>
                <b>All it takes is just one TiQet in your hand!</b>
            </p>
        </div>
    </section>
}

export default Text