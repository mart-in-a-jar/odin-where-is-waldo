import styles from "./Gameboard.module.scss";
import { getData } from "../firebase";
import { useEffect, useRef, useState } from "react";
import Snackbar from "./Snackbar";

const Gameboard = ({ level, setFound, handleWin }) => {
    const chars = level.characters;
    const [charSelectOpen, setCharSelectOpen] = useState(false);
    const [clickedCoords, setClickedCoords] = useState({
        x: undefined,
        y: undefined,
    });
    const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
    const [guess, setGuess] = useState({ x: undefined, y: undefined });
    const [displaySnackbar, setDisplaySnackbar] = useState(false);
    const [snackbarOptions, setSnackbarOptions] = useState({
        text: "",
        color: "rgba(0, 0, 0, 0.726)",
        duration: 1500,
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
        // this calculates the element's starting position on the x and y axis
        const offsetY = e.target.getBoundingClientRect().y + window.scrollY;
        const offsetX = e.target.getBoundingClientRect().x + window.scrollX;
        setImageOffset({ x: offsetX, y: offsetY });

        const clickedXPercentage = (e.pageX - offsetX) / e.target.offsetWidth;
        const clickedYPercentage = (e.pageY - offsetY) / e.target.offsetHeight;

        setGuess({ x: clickedXPercentage, y: clickedYPercentage });

        toggleCharSelect();

        /* console.log(
            `Clicked X: ${clickedXPercentage * 100}%, Y: ${
                clickedYPercentage * 100
            }%`
        ); */
    };

    // Check for win
    useEffect(() => {
        if (chars.every((char) => char.found)) {
            handleWin();
        }
    }, [chars, handleWin]);

    const handleGuess = async (char, charName) => {
        toggleCharSelect();
        const charCoords = await getCoords(char);
        if (
            Math.abs(charCoords.x - guess.x) < 0.02 &&
            Math.abs(charCoords.y - guess.y) < 0.005
        ) {
            setFound(char);
            setDisplaySnackbar(true);
            setSnackbarOptions((prevState) => {
                return { ...prevState, text: `You found ${charName}!` };
            });
        } else {
            setDisplaySnackbar(true);
            setSnackbarOptions((prevState) => {
                return { ...prevState, text: `Keep looking!` };
            });
        }
    };

    const getCoords = async (character) => {
        try {
            const coords = await getData("coords", character);
            if (coords) {
                return coords;
            } else {
                console.error("Could not find character with id", character);
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    return (
        <div className={styles["game-board"]}>
            <img
                className={styles.img}
                src={level.image}
                alt={level.name}
                onClick={handeleClick}
            />
            {charSelectOpen && (
                <CharSelect
                    chars={chars}
                    coords={clickedCoords}
                    handleClick={handleGuess}
                    offset={imageOffset}
                />
            )}

            <Snackbar
                text={snackbarOptions.text}
                duration={snackbarOptions.duration}
                color={snackbarOptions.color}
                display={displaySnackbar}
                hide={setDisplaySnackbar}
            />
        </div>
    );
};

const CharSelect = ({ chars, coords, handleClick, offset }) => {
    const element = useRef();

    const [xCoords, setXCoords] = useState(coords.x);
    const [yCoords, setYCoords] = useState(coords.y);

    const checkForOutOfBounds = () => {
        const modalWidth = element.current.offsetWidth;
        const modalHeight = element.current.offsetHeight;
        if (xCoords + modalWidth > document.body.offsetWidth - offset.x) {
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
        top: yCoords - offset.y,
        left: xCoords - offset.x,
    };
    const markerStyle = {
        top: coords.y - offset.y,
        left: coords.x - offset.x,
    };

    const notFoundChars = chars.filter((char) => !char.found);

    return (
        <>
            <div style={markerStyle} className={styles["guess-marker"]}></div>
            <ul style={style} className={styles["char-select"]} ref={element}>
                {notFoundChars.map((char) => {
                    return (
                        <li
                            key={char.id}
                            onClick={() => {
                                handleClick(char.id, char.name);
                            }}
                        >
                            {char.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Gameboard;
