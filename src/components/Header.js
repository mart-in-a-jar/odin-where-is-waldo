import { useState } from "react";
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

    const [moduleOpen, setModuleOpen] = useState(false);

    return (
        <div className={styles["found-counter"]}>
            <span>
                {numberOfFoundChars}/{chars.length} found
            </span>
            <div className={styles["found-module"]}>
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
        </div>
    );
};

export default Header;
