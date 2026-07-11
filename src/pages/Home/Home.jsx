import styles from './Home.module.scss';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import welcomeImg from '../../assets/images/welcomeimg.png';

function Home() {
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
            {/* inhoud van de homepagina */}
        </PageLayout>
    );
}

export default Home;