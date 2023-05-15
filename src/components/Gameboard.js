import styles from "./Gameboard.module.scss";
import { getData } from "../firebase";
import { useEffect, useRef, useState } from "react";

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
        const clickedXPercentage = (e.pageX - offsetX) / e.target.offsetWidth;
        const clickedYPercentage = (e.pageY - offsetY) / e.target.offsetHeight;

        toggleCharSelect();

        console.log(
            `Clicked X: ${clickedXPercentage * 100}%, Y: ${
                clickedYPercentage * 100
            }%`
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
    const element = useRef();

    const [xCoords, setXCoords] = useState(coords.x);
    const [yCoords, setYCoords] = useState(coords.y);

    const checkForOutOfBounds = () => {
        const modalWidth = element.current.offsetWidth;
        const modalHeight = element.current.offsetHeight;
        if (xCoords + modalWidth > document.body.offsetWidth) {
            setXCoords(xCoords - modalWidth);
        }
        if (yCoords + modalHeight > document.body.offsetHeight) {
            setYCoords(yCoords - modalHeight);
        }
    };
    
    useEffect(() => {
        checkForOutOfBounds();
    }, []);

    const style = {
        top: yCoords,
        left: xCoords,
    };

    const notFoundChars = chars.filter((char) => !char.found);

    return (
        <ul style={style} className={styles["char-select"]} ref={element}>
            {notFoundChars.map((char) => {
                return <li key={char.id}>{char.name}</li>;
            })}
        </ul>
    );
};

export default Gameboard;
