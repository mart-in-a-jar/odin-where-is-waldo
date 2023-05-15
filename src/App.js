import { useState } from "react";
import styles from "./App.module.scss";

import Gameboard from "./components/Gameboard";
import Header from "./components/Header";
import levels from "./levels";
import StartPage from "./components/StartPage";
import Scoreboard from "./components/Scoreboard";

function App() {
    const [level, setLevel] = useState(levels[0]);
    const [gameOver, setGameOver] = useState(true);
    const [timestamp, setTimestamp] = useState({
        start: undefined,
        end: undefined,
    });
    const [hasWon, setHasWon] = useState(false);

    const restartGame = () => {
        setGameOver(true);
        setHasWon(false);
    };

    const startGame = (level) => {
        // Take level as argument, restart time and set level
        setLevel(level);
        setGameOver(false);
        setTimestamp({ start: Date.now() });
    };

    const handleWin = () => {
        setTimestamp((prevState) => {
            return { ...prevState, end: Date.now() };
        });

        setHasWon(true);
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
            {hasWon ? (
                <Scoreboard
                    time={timestamp.end - timestamp.start}
                    level={level}
                    restart={restartGame}
                />
            ) : gameOver ? (
                <StartPage startGame={startGame} levels={levels} />
            ) : (
                <>
                    <Header chars={level.characters} restart={restartGame} />
                    <Gameboard level={level} setFound={setFound} handleWin={handleWin}/>
                </>
            )}
        </div>
    );
}

export default App;
