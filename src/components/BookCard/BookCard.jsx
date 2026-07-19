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
            className={styles.bookCard}
        >
            <div
                className={styles.bookCard__inner}>

                <div
                    className={styles.bookCard__imgWrapper}>
                    <img
                        className={styles.bookCard__img}
                        src={book.image}
                        alt={book.title}/>
                </div>
                <h3>{book.title}</h3>
                <p>{book.author?.name}</p>
                <h5 className={`${styles.bookCard__status} ${
                    book.available
                        ? styles.bookCard__statusAvailable
                        : styles.bookCard__statusUnavailable
                }`}>
    <span
        className={styles.bookCard__statusDot}
    />
                    {book.available ? 'Beschikbaar' : 'Niet beschikbaar'}
                </h5>
                <PrimaryButton
                    onClick={handleClick}
                    text="Bekijk"
                    size="small"
                    fullWidth={true}/>
            </div>
        </article>
    );
}

export default BookCard;