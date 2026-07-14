import styles from './LoanCard.module.scss';
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import {useNavigate} from "react-router-dom";
import img from "../../assets/images/BookWorm.png"


function LoanCard() {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/boek-details/${book.id}`);
    }

    return (
        <article
            className={styles.loancard}
        >
            <div
                className={styles.loancard__inner}>

                <div
                    className={styles.loan__imgWrapper}>
                    <img
                        className={styles.loancard__img}
                        src={img}
                        alt="title"/>
                </div>
                <h3>"title"</h3>
                <p>author</p>
                <div
                    className={styles.loancard.dateWrapper}>
                    <h5>Inleverdatum:</h5>
                    <h5>datum</h5>
                </div>

                <PrimaryButton
                    onClick={handleClick}
                    text="Bekijk"
                    fullWidth/>
            </div>
        </article>
    )
        ;
}

export default LoanCard;