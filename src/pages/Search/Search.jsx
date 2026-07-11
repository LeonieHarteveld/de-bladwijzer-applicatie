import styles from './Search.module.scss'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'

function Search() {


    return (
        <section
            className={styles.searchpage}>
            <div
                className={styles.searchcpage__inner}>
                <h1>Zoeken</h1>
                <SearchBar/>
            </div>
        </section>
    )
}

export default Search