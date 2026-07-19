import styles from './NotFound.module.scss'
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import BackButton from "../../components/Buttons/BackButton/BackButton.jsx";
import {useNavigate} from "react-router-dom";
import BookWorm from "../../assets/images/BookWorm.png"


function NotFound() {

    const navigate = useNavigate();

    function handleNavigate(e) {
        e.preventDefault();
        navigate("/");
    }


    return (
        <PageLayout
            title="404"
            subtitle="Deze pagina is opgegeten"
            card
            centered={true}
        >
                <BackButton
                    text="Terug naar overzicht"
                    onClick={handleNavigate}
                />

                <div
                    className={styles.error__wrapperImg}>
                    <img
                        className={styles.error__img}
                        src={BookWorm}
                        alt="afbeelding van een boekenwormpje die uit een boekkomt"/>
                </div>
        </PageLayout>
    )
}

export default NotFound
