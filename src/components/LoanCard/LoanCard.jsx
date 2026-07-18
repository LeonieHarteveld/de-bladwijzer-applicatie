import styles from './LoanCard.module.scss';
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import {useNavigate} from "react-router-dom";

function LoanCard({bookId, img, title, author, returnDate}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/boek-details/${bookId}`);
    }

    return (
        <article
            className={styles.loanCard}
        >
            <div
                className={styles.loanCard__inner}>

                <div
                    className={styles.loanCard__imgWrapper}>
                    <img
                        className={styles.loanCard__img}
                        src={img}
                        alt={title}/>
                </div>
                <div
                    className={styles.loanCard__details}>


                    <h3>{title}</h3>
                    <p>{author}</p>
                    <div
                        className={styles.loanCard.dateWrapper}>
                        <h5>Inleverdatum:</h5>
                        <h5>{returnDate}</h5>
                    </div>

                    <PrimaryButton
                        onClick={handleClick}
                        text="Bekijk"
                        fullWidth/>
                </div>
            </div>
        </article>
    );
}

export default LoanCard;