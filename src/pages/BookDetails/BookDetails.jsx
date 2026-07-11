import styles from './BookDetails.module.scss'
import BackButton from "../../components/Buttons/BackButton/BackButton.jsx";
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import {useNavigate} from "react-router-dom";

function BookDetails() {
    const navigate = useNavigate();

    return (
        <PageLayout
        classname={styles.BookDetails}
        >
            <BackButton
                text="Terug naar overzicht"
                onClick={() => navigate(-1)}
            />

        </PageLayout>
    )
}

export default BookDetails;
