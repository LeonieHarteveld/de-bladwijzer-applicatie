import styles from './Home.module.scss'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'

function Home() {


    return (
        <section
            className=${styles.home}
        >
            <SearchBar/>
            <div
                className={styles.home__inner}>

                <h1>Home pagina</h1>
            </div>
        </section>
    )
}

export default Home
