import styles from './GenreTabs.module.scss';

function GenreTabs({
                       genres,
                       selectedGenre,
                       onSelectGenre,
                   }) {
    return (
        <section className={styles.genreTabs}>
            <ul className={styles.genreTabs__list}>
                <li>
                    <button
                        className={`${styles.genreTabs__button} ${
                            selectedGenre === null
                                ? styles.genreTabs__buttonActive
                                : ''
                        }`}
                        type="button"
                        onClick={() => onSelectGenre(null)}
                    >
                        Alle
                    </button>
                </li>

                {genres.map((genre) => (
                    <li key={genre.id}>
                        <button
                            className={`${styles.genreTabs__button} ${
                                selectedGenre === genre.id
                                    ? styles.genreTabs__buttonActive
                                    : ''
                            }`}
                            type="button"
                            onClick={() =>
                                onSelectGenre(genre.id)
                            }
                        >
                            <span>{genre.icon}</span>
                            <span>{genre.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default GenreTabs;