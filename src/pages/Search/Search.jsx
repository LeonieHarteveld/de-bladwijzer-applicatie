import styles from './Search.module.scss'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import {useSearchParams} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';

import {useEffect, useState} from 'react';
import axios from 'axios';

import GenreTabs from '../../components/GenreTabs/GenreTabs.jsx';
import BookCardGrid from '../../components/BookCardGrid/BookCardGrid.jsx';

import {libraryService} from '../../helpers/libraryService.jsx';

import {enrichBooks, filterBooks} from '../../helpers/bookHelper.jsx';

function Search() {
    const [searchParams] = useSearchParams();

    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const searchTerm = searchParams.get('q') ?? '';

    useEffect(() => {
        const controller = new AbortController();

        async function fetchLibrary() {
            setLoading(true);
            setError(false);

            try {
                const {
                    books,
                    authors,
                    genres,
                } = await libraryService(controller.signal);

                const booksWithDetails = enrichBooks(
                    books,
                    authors,
                    genres,
                );

                setBooks(booksWithDetails);
                setGenres(genres);

            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
        }
    }

    fetchLibrary();

    return () => {
        controller.abort();
    };
}, []);


    const filteredBooks = filterBooks(
        books,
        selectedGenre,
        searchTerm,
    );

    return (
        <PageLayout
            showSearchBar={false}>
            <section className={styles.searchPage}>
                    <h1>Zoeken</h1>

                    <SearchBar
                        initialValue={searchTerm}
                        align="left"
                    />

                    {!searchTerm && (
                        <>
                            {loading && (
                                <p>Boeken worden geladen...</p>
                            )}

                            {!loading && error && (
                                <p>
                                    Er ging iets mis. Probeer het opnieuw.
                                </p>
                            )}

                            {!loading && !error && (
                                <GenreTabs
                                    genres={genres}
                                    selectedGenre={selectedGenre}
                                    onSelectGenre={setSelectedGenre}
                                />
                            )}
                        </>
                    )}

                    {searchTerm && (
                        <>
                            <h2>Resultaten voor “{searchTerm}”</h2>

                            <p>
                                {filteredBooks.length}{' '}
                                {filteredBooks.length === 1
                                    ? 'boek gevonden'
                                    : 'boeken gevonden'}
                            </p>
                        </>
                    )}

                    {!loading && !error && (
                        <BookCardGrid books={filteredBooks} />
                    )}
            </section>
        </PageLayout>
    );
}

export default Search