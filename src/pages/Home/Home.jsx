import styles from './Home.module.scss';

import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import GenreTabs from '../../components/GenreTabs/GenreTabs.jsx';
import BookCardGrid from '../../components/BookCardGrid/BookCardGrid.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';
import NewestBooksCard from '../../components/NewestBooksCard/NewestBooksCard.jsx';

import welcomeImg from '../../assets/images/welcomeimg.png';
import bookImg from "../../assets/images/BookImg.svg";

import {AuthContext} from '../../context/AuthContext.jsx';

import {libraryService} from '../../helpers/libraryService.jsx';
import {getLoans} from '../../helpers/loanService.jsx';
import {enrichBooks, filterBooks,} from '../../helpers/bookHelper.jsx';
import {sortByNewest} from '../../helpers/sortHelper.js';
import BookCard from "../../components/BookCard/BookCard.jsx";

function Home() {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loans, setLoans] = useState([]);

    const [selectedGenre, setSelectedGenre] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
            const controller = new AbortController();

            async function fetchHomeData() {
                setLoading(true);
                setError(false);

                try {
                    const [
                        libraryData,
                        allLoans,
                    ] = await Promise.all([
                        libraryService(controller.signal),
                        getLoans(controller.signal),
                    ]);

                    const booksWithDetails = enrichBooks(
                        libraryData.books,
                        libraryData.authors,
                        libraryData.genres,
                    );

                    const userLoans = allLoans.filter(
                        (loan) =>
                            Number(loan.usersId) ===
                            Number(user.id) &&
                            loan.returned === false,
                    );

                    setBooks(booksWithDetails);
                    setGenres(libraryData.genres);
                    setLoans(userLoans);
                } catch (e) {
                    console.error(e);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }

            fetchHomeData();

            return () => {
                controller.abort();
            };
        }, [user?.id]
    );

    const newestBooks = sortByNewest(books).slice(0, 3);

    const genreBooks = filterBooks(
        books,
        selectedGenre,
        '',
    );

    return (
        <PageLayout>
            {loading && (
                <p>Homepage wordt geladen...</p>
            )}

            {!loading && error && (
                <p className="errorMessage">
                    Er ging iets mis. Probeer het opnieuw.
                </p>
            )}

            {!loading && !error && (
                <div className={styles.home}>
                    <header className={styles.home__header}>
                        <h1 className={styles.home__title}>
                            Welkom terug,{' '}
                            {user?.email?.split('@')[0]}!
                            <img
                                className={
                                    styles.home__welcomeImg
                                }
                                src={welcomeImg}
                                alt="Zwaaiende hand"
                            />
                        </h1>
                    </header>

                    <section
                        className={styles.home__loanStatus}
                    >
                        <img src={bookImg} alt="Boek icon"/>

                        <h2
                            className={styles.home__loanNumber}
                        >
                            {loans.length}
                        </h2>

                        <div
                            className={styles.loanTextWrapper}>
                            <h3>
                                {loans.length === 0
                                    ? 'Geen boeken geleend'
                                    : loans.length === 1
                                        ? 'boek geleend'
                                        : 'boeken geleend'}
                            </h3>

                            <p>
                                {loans.length === 0
                                    ? 'Je hebt momenteel geen boeken geleend.'
                                    : loans.length === 1
                                        ? 'Je hebt momenteel 1 boek geleend.'
                                        : `Je hebt momenteel ${loans.length} boeken geleend.`}
                            </p>
                        </div>

                        <PrimaryButton
                            onClick={() => navigate("/mijn-leningen")}
                            text="Bekijk leningen"
                            type="button"
                            size="medium"
                            fullWidth={false}
                        />

                    </section>

                    <section className={styles.home__section}>
                        <h2>Nieuw in de bibliotheek</h2>
                        <p>De laatst toegevoegde boeken</p>

                        <ul className={styles.home__newestBooks}>
                            {newestBooks.map((book) => (
                                <li
                                    key={book.id}
                                    className={styles.home__newestBookItem}
                                >
                                    <NewestBooksCard book={book} />
                                </li>
                            ))}
                        </ul>

                    </section>

                    <section className={styles.home__section}>
                        <h2>Of ontdek per genre</h2>

                        <GenreTabs
                            genres={genres}
                            selectedGenre={selectedGenre}
                            onSelectGenre={setSelectedGenre}
                        />

                        <BookCardGrid books={genreBooks}/>

                    </section>
                </div>
            )}
        </PageLayout>
    );
}

export default Home;