import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { light } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./Header.module.scss";
import Timer from "./Timer";

const Header = ({ chars, restart }) => {
    return (
        <header className={styles.header}>
            <FoundCounter chars={chars} />
            <div className={styles.timer}>
                <Timer />
            </div>
            <div className={styles.restart} onClick={restart}>
                Restart
            </div>
        </header>
    );
};

const FoundCounter = ({ chars }) => {
    const numberOfFoundChars = chars.filter((char) => char.found).length;

    const [modalOpen, setModalOpen] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);

    const handeleClick = (e) => {
        if (hasClicked === false) {
            setHasClicked(true);
        }
        setModalOpen((prevState) => {
            return !prevState;
        });
    };

    return (
        <div
            className={`${styles["found-counter"]}${
                modalOpen ? " " + styles.active : ""
            }${hasClicked ? "" : " " + styles["not-clicked"]}`}
        >
            <span onClick={handeleClick}>
                {numberOfFoundChars}/{chars.length}
                <FontAwesomeIcon icon={light("circle-info")} />
            </span>
            {modalOpen && (
                <div className={styles["found-modal"]}>
                    {chars.map((char) => {
                        return (
                            <div
                                className={`${styles.char}${
                                    char.found ? " " + styles.found : ""
                                }`}
                                key={char.id}
                            >
                                <img src={char.image} alt={char.name} />
                                <div className="name">{char.name}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Header;
