import { useState } from "react";
import styles from "./App.module.scss";

import Gameboard from "./components/Gameboard";
import Header from "./components/Header";
import levels from "./levels";
import StartPage from "./components/StartPage";

function App() {
    const [level, setLevel] = useState(levels[0]);
    const [gameOver, setGameOver] = useState(false);

    const restartGame = () => {
        setGameOver(true);
    };

    const startGame = () => {
        // Take level as argument, restart time and set level
        setGameOver(false);
    };

    const setFound = (charId) => {
        setLevel((prevState) => {
            return {
                ...prevState,
                characters: prevState.characters.map((char) => {
                    if (char.id === charId) {
                        return {
                            ...char,
                            found: true,
                        };
                    } else {
                        return char;
                    }
                }),
            };
        });

    };

    return (
        <div className={styles.app}>
            {gameOver ? (
                <StartPage startGame={startGame} />
            ) : (
                <>
                    <Header chars={level.characters} restart={restartGame} />
                    <Gameboard level={level} setFound={setFound} />
                </>
            )}
        </div>
    );
}

export default App;
