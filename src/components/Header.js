import styles from "./Header.module.scss";
import Timer from "./Timer";

const Header = () => {
    return (
        <header className={styles.header}>
            <div>To find</div>
            <div>
                <Timer />
            </div>
            <div>Restart</div>
        </header>
    );
};

export default Header;
