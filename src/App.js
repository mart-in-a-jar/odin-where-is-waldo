import styles from "./App.module.scss";
import Gameboard from "./components/Gameboard";

import image from "./img/image1.jpg";


function App() {
    return (
        <>
            <Gameboard image={image} />
        </>
    );
}

export default App;
