import styles from './GenreTabs.module.scss';
import {API_BASE_URL, API_KEY} from '../../constants/api.jsx';
import axios from 'axios';
import {useEffect, useState} from 'react';

function GenreTabs() {
    const [genres, setGenres] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchGenres() {
            toggleError(false);
            toggleLoading(true);
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/genres`,
                    {
                        headers: {
                            'novi-education-project-id': API_KEY,
                        },
                        signal: controller.signal,
                    }
                );

                setGenres(response.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchGenres();

        return function cleanup() {
            controller.abort(); //
        }
    }, []);

    function handleClick(genreId) {
        setSelectedGenre(genreId);
    }

    return (
        <section className={styles.genreTabs}>

            {loading && <p>Genre's worden geladen...</p>}
            {!loading && error && (
                <p className="errorMessage">Er ging iets mis. Probeer het opnieuw.</p>
            )}

            {!loading && !error && (

                <ul className={styles.genreTabs__list}>
                    <li>
                        <button
                            className={`${styles.genreTabs__button} ${
                                selectedGenre === null
                                    ? styles.genreTabs__buttonActive
                                    : ''
                            }`}
                            type="button"
                            onClick={() => handleClick(null)}>
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
                            onClick={() => handleClick(genre.id)}>
                            <span>
                                {genre.icon}
                            </span>
                                <span>{genre.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default GenreTabs;