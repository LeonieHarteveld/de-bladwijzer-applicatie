import styles from './BackButton.module.scss';
import arrow from "../../../assets/images/ArrowIcon.svg"


function BackButton({ text = "Terug", onClick }) {
    return (
        <button
            className={styles.backButton}
            type="button"
            onClick={onClick}
            // onClick={() => navigate(-1)};
        >
            <img src={arrow} alt="" aria-hidden="true" />
            <span>{text}</span>
        </button>
    );
}

export default BackButton;