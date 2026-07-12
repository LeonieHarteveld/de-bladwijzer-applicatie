import styles from './BookCard.module.scss';
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";


function BookCard({book, author, genre}) {
    return (
        <article
            className={styles.bookcard}
        >
            <div
                className={styles.bookcard__inner}>
                <img
                    className={styles.bookcard__img}
                    src={book.image}
                    alt={book.title}/>
                <h2>{book.title}</h2>
                <p>{author?.name}</p>
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
                    onClick={() => console.log('clicked')}
                    // hier komt navigeren naar boekdetail pagina functie
                    text="Bekijk"
                    fullWidth/>
            </div>
        </article>
    )
        ;
}

export default BookCard;