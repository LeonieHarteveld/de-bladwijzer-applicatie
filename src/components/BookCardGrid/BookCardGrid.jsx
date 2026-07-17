import styles from './BookCardGrid.module.scss';
import BookCard from '../BookCard/BookCard.jsx';

function BookCardGrid({ books }) {
    if (books.length === 0) {
        return (
            <p>
                Er zijn geen boeken gevonden voor dit genre.
            </p>
        );
    }

    return (
        <section className={styles.bookCardGrid}>
            <ul className={styles.bookCardGrid__list}>
                {books.map((book) => (
                    <li
                        className={styles.bookCardGrid__item}
                        key={book.id}>
                        <BookCard
                            book={book}
                            author={book.author}
                            genre={book.genre}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default BookCardGrid;