import styles from './BookDetails.module.scss';

import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackButton from '../../components/Buttons/BackButton/BackButton.jsx';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';

import { libraryService } from '../../helpers/libraryService.jsx';
import { enrichBooks } from '../../helpers/bookHelper.jsx';
import { addLoan } from '../../helpers/loanService.jsx';
import {updateBookAvailability} from "../../helpers/bookService.jsx"

import { AuthContext } from '../../context/AuthContext.jsx';

function formatDate(date) {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1,
    ).padStart(2, '0');

    const day = String(
        date.getDate(),
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function createLoanDates() {
    const loanDate = new Date();
    const returnDate = new Date(loanDate);

    returnDate.setDate(returnDate.getDate() + 14);

    return {
        loanDate: formatDate(loanDate),
        returnDate: formatDate(returnDate),
    };
}

function BookDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBookDetails() {
            toggleError(false);
            toggleLoading(true);

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

                const foundBook = booksWithDetails.find(
                    (book) => book.id === Number(id),
                );

                setSelectedBook(foundBook);

            } catch (e) {
                if (e.name !== 'AbortError') {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        fetchBookDetails();

        return () => {
            controller.abort();
        };
    }, [id]);

    async function handleLoan() {
        toggleError(false);
        toggleLoading(true);

        const {
            loanDate,
            returnDate,
        } = createLoanDates();

        try {
            await addLoan({
                usersId: user.id,
                bookId: selectedBook.id,
                loanDate,
                returnDate,
                returned: false,
            })

            await updateBookAvailability(
                selectedBook.id,
                false
            )

            navigate('/mijn-leningen');
        } catch (e) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

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

            {!loading && !error && !selectedBook && (
                <p>Het boek is niet gevonden.</p>
            )}

            {!loading && !error && selectedBook && (
                <div className={styles.bookDetails}>
                    <BackButton
                        text="Terug naar overzicht"
                        onClick={() => navigate(-1)}
                    />

                    <article className={styles.bookDetails__inner}>
                        <div className={styles.bookDetails__imgWrapper}>
                            <img
                                className={styles.bookDetails__img}
                                src={selectedBook.image}
                                alt={selectedBook.title}
                            />
                        </div>

                        <div className={styles.bookDetails__text}>
                            <div className={styles.bookDetails__textTop}>
                                <h2>{selectedBook.author?.name}</h2>

                                <h1>{selectedBook.title}</h1>

                                <h5>
                                    <span>
                                        {selectedBook.genre?.icon}
                                    </span>{' '}
                                    {selectedBook.genre?.name}
                                </h5>

                                <h5
                                    className={
                                        styles.bookDetails__availability
                                    }
                                >
                                    <span
                                        className={
                                            styles.bookDetails__statusDot
                                        }
                                    />

                                    {selectedBook.available
                                        ? 'Beschikbaar'
                                        : 'Niet beschikbaar'}
                                </h5>
                            </div>

                            <div className={styles.bookDetails__textBottom}>
                                <h3>Beschrijving</h3>
                                <p>{selectedBook.description}</p>
                            </div>

                            {selectedBook.available && (
                                <PrimaryButton
                                    onClick={handleLoan}
                                    text="Lenen"
                                    type="button"
                                />
                            )}
                        </div>
                    </article>

                    <section className={styles.bookDetails__info}>
                        <div
                            className={
                                styles.bookDetails__additionalInfo
                            }
                        >
                            <h2>Over de auteur</h2>
                            <h3>{selectedBook.author?.name}</h3>
                            <p>
                                {selectedBook.author?.description}
                            </p>
                        </div>

                        <div
                            className={
                                styles.bookDetails__additionalInfo
                            }
                        >
                            <h2>Over het genre</h2>

                            <h3>
                                <span>
                                    {selectedBook.genre?.icon}
                                </span>{' '}
                                {selectedBook.genre?.name}
                            </h3>

                            <p>
                                {selectedBook.genre?.description}
                            </p>
                        </div>
                    </section>
                </div>
            )}
        </PageLayout>
    );
}

export default BookDetails;