import * as React from 'react';
import { useEffect, useState, FC } from 'react';
import styles from './Platform.module.css';
import { formatTime } from "@/utils/index";

interface CountdownProps {
    start: number;
    end: number;
    strokeWidth?: number;
    onComplete?: VoidFunction;
    lowColor?: string;
    highColor?: string;
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined;
}

const Countdown: FC<CountdownProps> = ({
        start,
        end,
        onComplete,
        strokeWidth = 2,
        strokeLinecap = 'round',
        lowColor= "#b0b0b0",
        highColor= "green"
    }) => {

    const delta = Math.max(end - start, 1000);
    const size = 100;
    const radius = size / 2;
    const circumference = size * Math.PI;

    const [countdown, setCountdown] = useState(delta);

    const {hours, minutes, seconds, milliseconds} = formatTime(countdown)

    const strokeDashoffset =
        circumference - (Math.max(end-Date.now(), 0) / delta) * circumference;

    useEffect(() => {
        const interval = setInterval(() => {
            if (countdown > 100) {
                setCountdown(end-Date.now());
            } else {
                clearInterval(interval);
                onComplete && onComplete();
                setCountdown(0)
            }
        }, 10);
        return () => clearInterval(interval);
    }, [countdown])

    return (
        <div className={styles.section}>
            <label>
                <h4>
                    <span>{hours}</span>
                    <b>:</b>
                    <span>{minutes}</span>
                    <b>:</b>
                    <span>{seconds}</span>
                    {/* <b>:</b>
                    <span>{milliseconds}</span> */}
                </h4>
                <h5>&nbsp; {!!!countdown && "Has ended !"} &nbsp;</h5>
            </label>
            <svg className={styles.svg} viewBox={`0 0 ${size+2*strokeWidth+10} ${size+2*strokeWidth+10}`}>
            <circle
                fill="none"
                r={radius}
                cx={radius+strokeWidth+5}
                cy={radius+strokeWidth+5}
                stroke={lowColor}
                strokeWidth={strokeWidth}
                />
            <circle
                fill="none"
                r={radius}
                cx={radius+strokeWidth+5}
                cy={radius+strokeWidth+5}
                stroke={highColor}
                strokeWidth={strokeWidth}
                strokeLinecap={strokeLinecap}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform-origin='center center'
                transform='rotate(-90)'
                />
            </svg>
        </div>
    );
};

export default Countdown;
