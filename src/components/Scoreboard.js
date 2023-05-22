import formatTimeStamp from "../utils/formatTimestamp";
import styles from "./Scoreboard.module.scss";
import {
    collection,
    firestore,
    setData,
    timestamp,
    query,
    orderBy,
    limit,
} from "../firebase";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Scoreboard = ({ level, time, restart }) => {
    const [user, setUser] = useState("");
    const [isHighscore, setIsHighscore] = useState(false);
    const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
    const timeFormated = formatTimeStamp(time, 2);

    // make a custom hook for this:
    const collectionRef = collection(firestore, `scores-${level.id}`);
    const scoreQuery = query(collectionRef, orderBy("time"), limit(10));
    const [scores, scoresAreLoading, scoresError] =
        useCollectionData(scoreQuery);
    //

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
            user,
            time,
            created: timestamp(),
        };
        await setData(`scores-${level.id}`, data);

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
                <div className="scores">
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
                                              {score.user}
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
                <button onClick={restart}>Play again</button>
                {/* get times from firestore on current elvel */}
                {/* if time among top 10, let user register score */}
            </div>
        </div>
    );
};

export default Scoreboard;
