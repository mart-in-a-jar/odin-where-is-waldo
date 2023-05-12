import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { light } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./Header.module.scss";
import Timer from "./Timer";

const Header = ({ chars }) => {
    return (
        <header className={styles.header}>
            <FoundCounter chars={chars} />
            <div>
                <Timer />
            </div>
            <div>Restart</div>
        </header>
    );
};

const FoundCounter = ({ chars }) => {
    const numberOfFoundChars = chars.filter((char) => char.found).length;

    const [modalOpen, setModalOpen] = useState(false);

    const handeleClick = (e) => {
        setModalOpen((prevState) => {
            return !prevState;
        });
    };

    return (
        <div
            className={`${styles["found-counter"]}${
                modalOpen ? " " + styles.active : ""
            }`}
        >
            <span onClick={handeleClick}>
                {numberOfFoundChars}/{chars.length} found{" "}
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
