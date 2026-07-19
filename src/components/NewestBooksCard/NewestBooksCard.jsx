import styles from "./NewestBooksCard.module.scss";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import {useNavigate} from "react-router-dom";

function NewestBooksCard({book}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/boek-details/${book.id}`);
    }

    return (
        <article className={styles.newestBooksCard}>
            <div className={styles.newestBooksCard__inner}>
                <div className={styles.newestBooksCard__imgWrapper}>
                    <img
                        className={styles.newestBooksCard__img}
                        src={book.image}
                        alt={`Boekomslag van ${book.title}`}
                    />
                </div>

                <div className={styles.newestBooksCard__textWrapper}>

                        <h3>{book.title}</h3>
                        <p className={styles.newestBooksCard__author}>{book.author?.name}</p>
                        <p className={styles.newestBooksCard__description}>
                            {book.description}
                        </p>

                    <PrimaryButton
                        onClick={handleClick}
                        text="Bekijk"
                        type="button"
                        size="small"
                    />
                </div>
            </div>
        </article>
    );
}

export default NewestBooksCard;