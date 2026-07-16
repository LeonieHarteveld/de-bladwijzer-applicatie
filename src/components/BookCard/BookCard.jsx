import styles from './BookCard.module.scss';
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import {useNavigate} from "react-router-dom";

function BookCard({book}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/boek-details/${book.id}`);
    }

    return (
        <article
            className={styles.bookcard}
        >
            <div
                className={styles.bookcard__inner}>

                <div
                    className={styles.bookcard__imgWrapper}>
                    <img
                        className={styles.bookcard__img}
                        src={book.image}
                        alt={book.title}/>
                </div>
                <h3>{book.title}</h3>
                <p>{book.author?.name}</p>
                <h5 className={`${styles.bookcard__status} ${
                    book.available
                        ? styles.bookcard__statusAvailable
                        : styles.bookcard__statusUnavailable
                }`}>
    <span
        className={styles.bookcard__statusDot}
    />
                    {book.available ? 'Beschikbaar' : 'Niet beschikbaar'}
                </h5>
                <PrimaryButton
                    onClick={handleClick}
                    text="Bekijk"
                    fullWidth/>
            </div>
        </article>
    );
}

export default BookCard;