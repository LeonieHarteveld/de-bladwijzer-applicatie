import styles from './Search.module.scss'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import GenreTabs from '../../components/GenreTabs/GenreTabs.jsx';
import BookCardGrid from '../../components/BookCardGrid/BookCardGrid.jsx';

import { libraryService }  from '../../helpers/libraryService.jsx';

import {
    enrichBooks,
    filterBooks,
} from '../../helpers/bookHelper.jsx';

function Search() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    const [selectedGenre, setSelectedGenre] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchLibrary() {
            setLoading(true);
            setError(false);

            try {
                const response = await libraryService(
                    controller.signal
                );

                setBooks(response.books);
                setAuthors(response.authors);
                setGenres(response.genres);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error(
                        'Bibliotheekgegevens ophalen mislukt:',
                        error
                    );

                    setError(true);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchLibrary();

        return () => {
            controller.abort();
        };
    }, []);

    const booksWithDetails = useMemo(() => {
        return enrichBooks(
            books,
            authors,
            genres
        );
    }, [books, authors, genres]);

    const filteredBooks = useMemo(() => {
        return filterBooks(
            booksWithDetails,
            selectedGenre
        );
    }, [booksWithDetails, selectedGenre]);

    return (
        <section
            className={styles.searchpage}>
            <div
                className={styles.searchpage__inner}>
                <h1>Zoeken</h1>
                <SearchBar/>
                <h2>Of ontdek per genre</h2>

                {loading && (
                    <p>Boeken worden geladen...</p>
                )}

                {!loading && error && (
                    <p className="errorMessage">
                        Er ging iets mis. Probeer het opnieuw.
                    </p>
                )}

                {!loading && !error && (
                    <>
                        <GenreTabs
                            genres={genres}
                            selectedGenre={selectedGenre}
                            onSelectGenre={setSelectedGenre}
                        />

                        <BookCardGrid books={filteredBooks} />
                    </>
                )}
            </div>
        </section>
    )
}

export default Search