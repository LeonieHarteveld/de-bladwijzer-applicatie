import styles from './BookDetails.module.scss'
import BackButton from "../../components/Buttons/BackButton/BackButton.jsx";
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import {useNavigate, useParams} from "react-router-dom";
import testafbeelding from "../../assets/images/nav-img.png"
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx"
import axios from 'axios';
import {libraryService} from "../../helpers/libraryService.jsx";
import {
    enrichBooks,
} from '../../helpers/bookHelper.jsx';
import {useState, useEffect, useMemo} from "react";

function BookDetails() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);


    function handleLoan(e) {
        e.preventDefault();
        navigate("/");
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBookDetails() {
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

        fetchBookDetails();

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

    const selectedBook = useMemo(() => {
        return booksWithDetails.find(book => book.id === Number(id));
    }, [booksWithDetails, id]);


    return (
        <PageLayout>
            {loading && (
                <p>Boeken worden geladen...</p>
            )}

            {!loading && error && (
                <p className="errorMessage">
                    Er ging iets mis. Probeer het opnieuw.
                </p>
            )}

            {!loading && !error && (
            <div
                className={styles.bookDetails}
            >
                <BackButton
                    text="Terug naar overzicht"
                    onClick={() => navigate(-1)}
                />

                        <article
                            className={styles.bookDetails__inner}
                        >
                            <div
                                className={styles.bookDetails__imgWrapper}
                            >
                                <img
                                    className={styles.bookDetails__img}
                                    src={selectedBook.image}
                                    alt={selectedBook.title}
                                />
                            </div>

                            <div
                                className={styles.bookDetails__text}
                            >
                                <div
                                    className={styles.bookDetails__textTop}>
                                    <h2>{selectedBook.author?.name}</h2>
                                    <h1>{selectedBook.title}</h1>


                                    <h5>
                                        <span>{selectedBook.genre?.icon}</span>{' '}
                                        {selectedBook.genre?.name}
                                    </h5>
                                    <h5
                                        className={styles.bookDetails__availability}
                                    >
                        <span
                            className={styles.bookDetails__statusDot}
                        />
                                        {selectedBook.available
                                            ? 'Beschikbaar'
                                            : 'Niet beschikbaar'}</h5>
                                </div>
                                <div
                                    className={styles.bookDetails__textBottom}>
                                    <h3>Beschrijving</h3>
                                    <p>{selectedBook.description}</p>
                                </div>
                                <PrimaryButton
                                    onClick={handleLoan}
                                    text="Lenen"
                                    type='button'
                                />
                            </div>
                        </article>

                    <section className={styles.bookDetails__info}>
                <div className={styles.bookDetails__additionalInfo}>
                    <h2>Over de auteur</h2>
                    <h3>{selectedBook.author?.name}</h3>
                    <p>{selectedBook.author?.description}</p>
                </div>

                <div className={styles.bookDetails__additionalInfo}>
                    <h2>Over het genre</h2>
                    <h3>
                        <span>{selectedBook.genre?.icon}</span>{' '}
                        {selectedBook.genre?.name}
                    </h3>
                    <p>{selectedBook.genre?.description}</p>
                </div>
            </section>

            </div>
)}
        </PageLayout>
    )
}

export default BookDetails;
