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

    return (
        <div className={styles.app}>
            {gameOver ? (
                <StartPage startGame={startGame} />
            ) : (
                <>
                    <Header chars={level.characters} restart={restartGame} />
                    <Gameboard image={level.image} chars={level.characters} />
                </>
            )}
        </div>
    );
}

export default App;
