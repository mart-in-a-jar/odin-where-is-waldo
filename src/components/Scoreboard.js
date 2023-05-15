import formatTimeStamp from "../utils/formatTimestamp";
import styles from "./Scoreboard.module.scss";

const Scoreboard = ({ level, time, restart }) => {
    const timeFormated = formatTimeStamp(time / 1000, 2);
    return (
        <div className={styles.scoreboard}>
            <h1>You won!</h1>
            <h2>Highscores</h2>
            {/* get times from firestore on current elvel */}
            <p>Your time: {timeFormated}</p>
            {/* if time among top 10, let user register score */}
            <button onClick={restart}>Restart</button>
        </div>
    );
};

export default Scoreboard;
