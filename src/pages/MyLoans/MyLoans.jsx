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


    return (
        <PageLayout
            title="Mijn leningen"
            subtitle="Een overzicht van jouw huidige leningen"
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
                <p>De geleende boeken zijn niet gevonden.</p>
            )}

            {!loading && !error && loans.map((loan) => (
                <LoanCard
                    key={loan.id}
                    bookId={loan.bookId}
                    img={loan.book?.image}
                    title={loan.book?.title}
                    author={loan.author?.name}
                    returnDate={loan.returnDate}
                />
            ))}

        </PageLayout>
    )
}

export default MyLoans