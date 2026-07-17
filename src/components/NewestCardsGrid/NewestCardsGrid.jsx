import styles from './NewestCardsGrid.module.scss';
import NewestBooksCard from '../NewestBooksCard/NewestBooksCard.jsx';

function NewestCardsGrid({books}) {
    if (books.length === 0) {
        return <p>Er zijn geen nieuwe boeken gevonden.</p>;
    }

    return (
        <section className={styles.newestCardsGrid}>
            <ul className={styles.newestCardsGrid__list}>
                {books.map((book) => (
                    <li
                        key={book.id}
                        className={styles.newestCardsGrid__item}
                    >
                        <NewestBooksCard book={book}/>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default NewestCardsGrid;