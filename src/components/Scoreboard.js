import formatTimeStamp from "../utils/formatTimestamp";
import styles from "./Scoreboard.module.scss";

const Scoreboard = ({ level, time, restart }) => {
    const timeFormated = formatTimeStamp(time / 1000, 2);

    return (
        <div className={styles.scoreboard}>
            <div>
                <h1>You won!</h1>
                <p>Your time: <span className={styles.time}>{timeFormated}</span></p>
                <button onClick={restart}>Restart</button>
                <h2>Highscores</h2>
                {/* get times from firestore on current elvel */}
                {/* if time among top 10, let user register score */}
                <p>Comming soon..</p>
            </div>
        </div>
    );
};

export default Scoreboard;
