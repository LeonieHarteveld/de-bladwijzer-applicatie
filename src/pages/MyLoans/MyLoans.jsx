import styles from './MyLoans.module.scss'
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import LoanCard from "../../components/LoanCard/LoanCard.jsx";

import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext, useState, useEffect} from "react";

import {getAuthors} from '../../helpers/authorService.jsx'
import {getBooks} from '../../helpers/bookService.jsx'
import {getLoans} from "../../helpers/loanService.jsx"

function MyLoans() {
    const {user} = useContext(AuthContext);

    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);
    const [loans, setLoans] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [loansPerPage, setLoansPerPage] = useState(3);
    const totalPages = Math.ceil(loans.length / loansPerPage);
    const lastPage = Math.max(0, totalPages - 1);

    const firstLoanIndex = currentPage * loansPerPage;

    const visibleLoans = loans.slice(
        firstLoanIndex,
        firstLoanIndex + loansPerPage,
    );

    function showPreviousLoans() {
        setCurrentPage((page) => Math.max(page - 1, 0));
    }

    function showNextLoans() {
        setCurrentPage((page) => Math.min(page + 1, lastPage));
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchLoans() {
            try {
                toggleLoading(true);
                toggleError(false);

                const [
                    allLoans,
                    books,
                    authors,
                ] = await Promise.all([
                    getLoans(controller.signal),
                    getBooks(controller.signal),
                    getAuthors(controller.signal),
                ]);

                const userLoans = allLoans
                    .filter(
                        (loan) =>
                            Number(loan.usersId) === user.id,
                    )
                    .map((loan) => {
                        const book = books.find(
                            (book) =>
                                book.id === loan.bookId,
                        );

                        const author = authors.find(
                            (author) =>
                                author.id === book?.authorId,
                        );

                        return {
                            ...loan,
                            book,
                            author,
                        };
                    });

                setLoans(userLoans);
                setCurrentPage(0);
            } catch (e) {
                console.log(e);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchLoans();

        return () => {
            controller.abort();
        };

    }, [user?.id]);

    useEffect(() => {
        function updateLoansPerPage() {
            if (window.innerWidth <= 600) {
                setLoansPerPage(1);
            } else if (window.innerWidth <= 1100) {
                setLoansPerPage(2);
            } else {
                setLoansPerPage(3);
            }
        }

        updateLoansPerPage();

        window.addEventListener('resize', updateLoansPerPage);

        return () => {
            window.removeEventListener('resize', updateLoansPerPage);
        };
    }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [loansPerPage]);

    return (
        <PageLayout
            title="Mijn leningen"
            subtitle="Een overzicht van jouw huidige leningen"
            card
        >
            {loading && (
                <p>Leningen worden geladen...</p>
            )}

            {!loading && error && (
                <p className="errorMessage">
                    Er ging iets mis. Probeer het opnieuw.
                </p>
            )}

            {!loading && !error && loans.length === 0 && (
                <p>Er zijn 0 boeken geleend.</p>
            )}

            {!loading && !error && loans.length > 0 && (
                <section className={styles.loans}>
                    {currentPage > 0 && (
                        <button
                            type="button"
                            className={`${styles.loans__arrow} ${styles['loans__arrow--left']}`}
                            onClick={showPreviousLoans}
                        >
                            ‹
                        </button>
                    )}

                    <div className={styles.loans__content}>
                        <ul className={styles.loans__list}>
                            {visibleLoans.map((loan) => (
                                <LoanCard
                                    key={loan.id}
                                    bookId={loan.bookId}
                                    img={loan.book?.image}
                                    title={loan.book?.title}
                                    author={loan.author?.name}
                                    returnDate={loan.returnDate}
                                />
                            ))}
                        </ul>

                        <div className={styles.loans__shelf} />
                    </div>

                    {currentPage < lastPage && (
                        <button
                            type="button"
                            className={`${styles.loans__arrow} ${styles['loans__arrow--right']}`}
                            onClick={showNextLoans}
                        >
                            ›
                        </button>
                    )}
                </section>


            )}

        </PageLayout>
    )
}

export default MyLoans