import styles from './SearchBar.module.scss'
import {useState} from 'react'
import searchIcon from "../../assets/icons/search-icon.svg"

function SearchBar() {
    const [search, setSearch] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Zoeken naar:", search);
    }

    return (
        <div
        className={styles.search__bar}>
            <form
                className={styles.search__form}
                onSubmit={handleSubmit}
            >
                <button
                    className={styles.search__button}
                    type="submit">
                    <img src={searchIcon} alt="Zoekknop"/>
                </button>
                <input
                    className={styles.search__input}
                    type="search"
                    placeholder="Zoek op boek, auteur of ISBN"
                    onChange={e => setSearch(e.target.value)}/>
            </form>
        </div>
    )
}

export default SearchBar;
