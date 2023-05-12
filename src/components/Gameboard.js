import styles from "./Gameboard.module.scss";
import { getData } from "../firebase";
import { useState } from "react";

const Gameboard = ({ image, chars }) => {
    const [charSelectOpen, setCharSelectOpen] = useState(false);
    const [clickedCoords, setClickedCoords] = useState({
        x: undefined,
        y: undefined,
    });

    const toggleCharSelect = () => {
        setCharSelectOpen((prevState) => {
            return !prevState;
        });
    };

    const handeleClick = (e) => {
        if (charSelectOpen) {
            toggleCharSelect();
            return;
        }
        setClickedCoords({ x: e.pageX, y: e.pageY });
        // take header into account (and potential other adjustments)
        const offsetY = e.target.getBoundingClientRect().y + window.scrollY;
        const offsetX = e.target.getBoundingClientRect().x + window.scrollX;
        const clickedXPercentage = (e.pageX - offsetX) / e.target.width;
        const clickedYPercentage = (e.pageY - offsetY) / e.target.height;

        toggleCharSelect();

        console.log(
            `Clicked X: ${clickedXPercentage}%, Y: ${clickedYPercentage}%`
        );

        // set coordinates in state, pop open menu at location and handle comparison with the character thats chosen
    };

    const handleGuess = (char) => {};

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
            {charSelectOpen && (
                <CharSelect chars={chars} coords={clickedCoords} />
            )}
        </div>
    );
};

const CharSelect = ({ chars, coords }) => {
    // if too far left or down -> shift accordingly
    // if coords.x + width-of-modal > vw -> coord.x = coord.x -width of modal
    // same with vertical
    const style = {
        top: coords.y,
        left: coords.x,
    };

    const notFoundChars = chars.filter(char => !char.found)

    return (
        <ul style={style} className={styles["char-select"]}>
            {notFoundChars.map((char) => {
                return <li key={char.id}>{char.name}</li>;
            })}
        </ul>
    );
};

export default Gameboard;
