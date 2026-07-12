import styles from './Home.module.scss';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import welcomeImg from '../../assets/images/welcomeimg.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import BackButton from '../../components/Buttons/BackButton/BackButton.jsx';
import GenreTabs from '../../components/GenreTabs/GenreTabs.jsx';
import BookCardGrid from '../../components/BookCardGrid/BookCardGrid.jsx';
import { libraryService } from '../../helpers/libraryService.jsx';

function Home() {
    const navigate = useNavigate();

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
                const data = await libraryService(
                    controller.signal
                );

                setBooks(data.books);
                setAuthors(data.authors);
                setGenres(data.genres);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error(error);
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
        return books.map((book) => {
            const author = authors.find(
                (author) => author.id === book.authorId
            );

            const genre = genres.find(
                (genre) => genre.id === book.genreId
            );

            return {
                ...book,
                author,
                genre,
            };
        });
    }, [books, authors, genres]);

    const filteredBooks = useMemo(() => {
        if (selectedGenre === null) {
            return booksWithDetails;
        }

        return booksWithDetails.filter(
            (book) => book.genreId === selectedGenre
        );
    }, [booksWithDetails, selectedGenre]);

    function handleNavigate() {
        navigate('/boek-details');
    }

    return (
        <PageLayout
            title={
                <span className={styles.home__title}>
                    Welkom terug
                    <img
                        className={styles.home__welcomeImg}
                        src={welcomeImg}
                        alt="Zwaaiende hand"
                    />
                </span>
            }
            subtitle="Ontdek boeken per genre"
        >
            {loading && <p>Boeken worden geladen...</p>}

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

            <BackButton
                text="Terug naar overzicht"
                onClick={handleNavigate}
            />
        </PageLayout>
    );
}

export default Home;