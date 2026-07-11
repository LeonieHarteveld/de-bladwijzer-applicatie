import styles from './Search.module.scss'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'

function Search() {

    return (
        <section
            className={styles.searchpage}>
            <div
                className={styles.searchpage__inner}>
                <h1>Zoeken</h1>
                <SearchBar/>
                <h2>Of ontdek per genre</h2>
            </div>
        </section>
    )
}

export default Search