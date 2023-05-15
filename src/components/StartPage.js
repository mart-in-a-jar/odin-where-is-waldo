import { useState } from "react";
import styles from "./StartPage.module.scss";

const StartPage = ({ startGame, levels }) => {
    const [chosenLevel, setChosenLevel] = useState(levels[0]);
    return (
        // Choose and set level
        <div className={styles["start-page"]}>
            <button
                onClick={() => {
                    startGame(chosenLevel);
                }}
            >
                Start game
            </button>
            <p>Insert list of maps to choose from here</p>
        </div>
    );
};

export default StartPage;
