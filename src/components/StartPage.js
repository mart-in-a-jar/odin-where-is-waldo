import styles from "./StartPage.module.scss";

const StartPage = ({ startGame, levels }) => {
    return (
        <div className={styles["start-page"]}>
            <h1>Choose level</h1>
            <div className={styles.levels}>
                {levels.map((level, i) => {
                    return (
                        <div
                            key={level.id}
                            className={styles.level}
                            onClick={() => {
                                startGame(levels[i]);
                            }}
                        >
                            <h1>{level.name}</h1>
                            <img src={level.image} alt="" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StartPage;
