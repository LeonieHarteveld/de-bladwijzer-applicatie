import styles from './Home.module.scss';

import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import GenreTabs from '../../components/GenreTabs/GenreTabs.jsx';
import BookCardGrid from '../../components/BookCardGrid/BookCardGrid.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';
import NewestCardsGrid from '../../components/NewestCardsGrid/NewestCardsGrid.jsx';

import welcomeImg from '../../assets/images/welcomeimg.png';
import bookImg from "../../assets/images/BookImg.svg";

import {AuthContext} from '../../context/AuthContext.jsx';

import {libraryService} from '../../helpers/libraryService.jsx';
import {getLoans} from '../../helpers/loanService.jsx';
import {enrichBooks, filterBooks,} from '../../helpers/bookHelper.jsx';
import {sortByNewest} from '../../helpers/sortHelper.js';

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
        <PageLayout
            title={
                !loading
                    ? (
                        <span className={styles.home__titleContent}>
                    Welkom terug, {user?.email?.split('@')[0]}!
                    <img
                        className={styles.home__welcomeImg}
                        src={welcomeImg}
                        alt=""
                    />
                </span>
                    )
                    : null
            }>
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
                    <section
                        className={styles.home__loanStatus}
                    >
                        <div
                            className={styles.home__loanDetails}>
                            <img src={bookImg} alt="Boek icon"/>

                            <h2
                                className={styles.home__loanNumber}
                            >
                                {loans.length}
                            </h2>

                            <div
                                className={styles.home__loanTextWrapper}>
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
                        </div>

                        <PrimaryButton
                            onClick={() => navigate("/mijn-leningen")}
                            text="Bekijk leningen"
                            type="button"
                            size="medium"
                            fullWidth={false}
                        />

                    </section>

                    <NewestCardsGrid books={newestBooks}/>

                    <section className={styles.home__section}>

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