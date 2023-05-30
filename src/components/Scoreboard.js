import formatTimeStamp from "../utils/formatTimestamp";
import styles from "./Scoreboard.module.scss";
import { setData, timestamp, useGetHighscores } from "../firebase";
import { useEffect, useState } from "react";

const USER_MAX_LENGTH = 25;

const Scoreboard = ({ level, time, restart }) => {
    const [user, setUser] = useState("");
    const [isHighscore, setIsHighscore] = useState(false);
    const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
    const timeFormated = formatTimeStamp(time, 2);

    const [scores, scoresAreLoading, scoresError] = useGetHighscores(level);

    useEffect(() => {
        if (scores) {
            const isNewHighScore = Boolean(
                time < Math.max(...scores.map((score) => score.time))
            );
            if (isNewHighScore || scores.length < 10) {
                setIsHighscore(true);
            }
        }
    }, [scores, time]);

    const writeScore = async (e) => {
        e.preventDefault();

        const data = {
            user: user.slice(0, USER_MAX_LENGTH),
            time,
            created: timestamp(),
        };
        try {
            await setData(`scores-${level.id}`, data);
        } catch (error) {
            console.error("Could not write highscore: ", error);
        }

        setHasSubmittedScore(true);
    };

    const handleUserInput = (e) => {
        setUser(e.target.value);
    };

    const registerScore = (
        <>
            <p>Submit your score</p>
            <form className={styles["register-score"]} onSubmit={writeScore}>
                <input
                    type="text"
                    className={styles["score-input"]}
                    value={user}
                    onChange={handleUserInput}
                    placeholder="Name"
                    maxLength={USER_MAX_LENGTH}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );

    return (
        <div className={styles.scoreboard}>
            <div>
                <h1>You won!</h1>
                <p>
                    Your time:{" "}
                    <span className={styles["user-time"]}>{timeFormated}</span>
                </p>
                {isHighscore && !hasSubmittedScore && registerScore}
                <div className={styles.scores}>
                    <h2>Highscores</h2>
                    <ol className={styles.list}>
                        {scores
                            ? scores.map((score, i) => {
                                  return (
                                      <li
                                          key={i}
                                          className={styles["list-element"]}
                                      >
                                          <div className={styles.name}>
                                              {score.user.slice(
                                                  0,
                                                  USER_MAX_LENGTH
                                              )}
                                          </div>{" "}
                                          <div className={styles.time}>
                                              {formatTimeStamp(score.time, 2)}
                                          </div>
                                      </li>
                                  );
                              })
                            : scoresAreLoading
                            ? "Loading.."
                            : scoresError}
                    </ol>
                </div>
                <button className={styles["play-again"]} onClick={restart}>
                    Play again
                </button>
            </div>
        </div>
    );
};

export default Scoreboard;
