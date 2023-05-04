import styles from "./Gameboard.module.scss";

const Gameboard = ({ image }) => {
    const handeleClick = (e) => {
        const clickedXPercentage = e.pageX / e.target.width;
        const clickedYPercentage = e.pageY / e.target.height;
        console.log(`Clicked X: ${clickedXPercentage}%, Y: ${clickedYPercentage}%`);
    };

    return (
        <div className="game-board">
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
