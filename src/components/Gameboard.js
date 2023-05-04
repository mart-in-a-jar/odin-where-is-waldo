import styles from "./Gameboard.module.scss";
import { getData } from "../firebase";

const Gameboard = ({ image }) => {
    const handeleClick = (e) => {
        const clickedXPercentage = e.pageX / e.target.width;
        const clickedYPercentage = e.pageY / e.target.height;
        console.log(
            `Clicked X: ${clickedXPercentage}%, Y: ${clickedYPercentage}%`
        );
        getCoords("ash");
    };

    const getCoords = async (character) => {
        const coords = await getData("coords", character);
        console.log(coords);
    };

    return (
        <div className="game-board">
            <img
                className={styles.img}
                src={image}
                alt=""
                onClick={handeleClick}
            />
        </div>
    );
};

export default Gameboard;
