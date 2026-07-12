import styles from './BookDetails.module.scss'
import BackButton from "../../components/Buttons/BackButton/BackButton.jsx";
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import {useNavigate} from "react-router-dom";
import testafbeelding from "../../assets/images/nav-img.png"
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx"

function BookDetails() {
    const navigate = useNavigate();

    function handleLoan(e) {
        e.preventDefault();
        navigate("/");
    }


return (
    <PageLayout>
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
                        src="https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_64.zip&file=0012646506-L.jpg"
                        alt=""
                    />
                </div>
                <div
                    className={styles.bookDetails__text}
                >
                    <div
                    className={styles.bookDetails__textTop}>
                    <h2>Hier komt auteur</h2>
                    <h1>Hier komt titel</h1>
                    <h5>Hier komt genre met icon</h5>
                    <h5
                        className={styles.bookDetails__availability}
                    >
                        <span
                            className={styles.bookDetails__statusDot}
                        />
                        beschikbaarheid</h5>
                    </div>
                    <div
                        className={styles.bookDetails__textBottom}>
                    <h3>Beschrijving</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Dit is een voorbeeld van een uitgebreide, opvultekst die vaak wordt gebruikt in lay-outs.    </p>
                    </div>
                    <PrimaryButton
                        onClick={handleLoan}
                        text="Lenen"
                        type='button'
                    />

                </div>
            </article>

        </div>
    </PageLayout>
)
}

export default BookDetails;
