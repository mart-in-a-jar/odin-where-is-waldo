import styles from "./StartPage.module.scss";

const StartPage = ({ startGame }) => {
    return (
        <div className={styles["start-page"]}>
            <button onClick={startGame}>Start game</button>
            <p>Insert list of maps to choose from here</p>
        </div>
    );
};

export default StartPage;
