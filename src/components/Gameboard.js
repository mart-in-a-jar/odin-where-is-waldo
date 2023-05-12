import styles from "./Gameboard.module.scss";
import { getData } from "../firebase";

const Gameboard = ({ image }) => {
    const handeleClick = (e) => {
        // take header into account (and potential other adjustments)
        const offsetY = e.target.getBoundingClientRect().y + window.scrollY;
        const offsetX = e.target.getBoundingClientRect().x + window.scrollX;
        const clickedXPercentage = (e.pageX - offsetX) / e.target.width;
        const clickedYPercentage = (e.pageY - offsetY) / e.target.height;
        console.log(
            `Clicked X: ${clickedXPercentage}%, Y: ${clickedYPercentage}%`
        );
        getCoords("ash");

        // set coordinates in state, pop open menu at location and handle comparison with the character thats chosen
    };

    const getCoords = async (character) => {
        const coords = await getData("coords", character);
        console.log(coords);
    };

    return (
        <div className={styles["game-board"]}>
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
