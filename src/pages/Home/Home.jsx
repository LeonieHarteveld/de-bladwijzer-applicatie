import styles from './Home.module.scss';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import welcomeImg from '../../assets/images/welcomeimg.png';
import {useNavigate} from "react-router-dom";
import BackButton from '../../components/Buttons/BackButton/BackButton.jsx';


function Home() {

    const navigate = useNavigate();

    function handleNavigate(e) {
        e.preventDefault();
        navigate("/boek-details");
    }

    return (
        <PageLayout
            title={
                <span className={styles.home__title}>
            Welkom terug
            <img
                className={styles.home__welcomeImg}
                src={welcomeImg}
                alt="Zwaaiende hand"
            />
        </span>
            }
            subtitle="Ontdek boeken per genre"
        >
            <BackButton
            text="Terug naar overzicht"
            onClick={handleNavigate}
            />

        </PageLayout>
    );
}

export default Home;