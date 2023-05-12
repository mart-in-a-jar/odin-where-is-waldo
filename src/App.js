import { useState } from "react";
import styles from "./App.module.scss";

import Gameboard from "./components/Gameboard";
import Header from "./components/Header";
import levels from "./levels";

function App() {
    const [level, setLevel] = useState(levels[0]);
    return (
        <div className={styles.app}>
            <Header chars={level.characters} />
            <Gameboard image={level.image} />
        </div>
    );
}

export default App;
