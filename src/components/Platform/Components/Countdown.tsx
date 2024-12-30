import { useEffect, useState, FC } from 'react';
import { formatTime } from "@/utils/index";

type CountdownProps = {
    end: number,
    onComplete?: VoidFunction,
}

const Countdown: FC<CountdownProps> = ({
        end,
        onComplete,
    }) => {

    end = end*1000 // to millies

    const [countdown, setCountdown] 
        = useState(Math.abs(end - Date.now()));

    useEffect(() => {
        const interval = setInterval(() => {
            if (countdown > 100) {
                setCountdown(Math.abs(end-Date.now())/1000);
            } else {
                clearInterval(interval);
                onComplete && onComplete();
                setCountdown(0)
            }
        }, 100);
        return () => clearInterval(interval);
    }, [])

    const {days, hours, minutes, seconds} = formatTime(countdown)

    return (
        <>
            {
                parseInt(days) > 0 
                ? (<>
                    <span>{days}</span>
                    <i>:</i>
                    </>)
                : ''
            }
            <span>{hours}</span>
            <i>:</i>
            <span>{minutes}</span>
            <i>:</i>
            <span>{seconds}</span>
        </>
    )
}

export default Countdown;
