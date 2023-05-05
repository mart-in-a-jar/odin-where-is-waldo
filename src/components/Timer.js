import { useEffect, useState } from "react";
import styled from "styled-components";
import formatTimeStamp from "../utils/formatTimestamp";

const TimerElement = styled.div`
    width: 150px;
    text-align: center;
    font-size: 2rem;
`;

const Timer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((oldSeconds) => {
                return oldSeconds + 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return <TimerElement>{formatTimeStamp(seconds, 2)}</TimerElement>;
};

export default Timer;
