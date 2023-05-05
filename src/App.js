import styles from "./App.module.scss";
import Gameboard from "./components/Gameboard";
import Header from "./components/Header";

import image from "./img/image1.jpg";

function App() {
    return (
        <>
            <Header />
            <Gameboard image={image} />
        </>
    );
}

export default App;
