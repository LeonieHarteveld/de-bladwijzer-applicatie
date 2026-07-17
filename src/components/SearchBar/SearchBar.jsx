import styles from './SearchBar.module.scss';
import {useState, useEffect} from 'react';
import searchIcon from "../../assets/icons/search-icon.svg";
import {useNavigate} from "react-router-dom";


function SearchBar({initialValue = ""}) {
    const [searchInput, setSearchInput] = useState(initialValue);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchInput(initialValue);
    }, [initialValue]);

    function
    handleSubmit(e) {
        e.preventDefault()
        const searchTerm = searchInput.trim().toLowerCase();

        if (searchTerm === '') {
            navigate('/zoekpagina');
            return;
        }
        navigate(
            `/zoekpagina?q=${encodeURIComponent(searchTerm)}`
        );
    }

    return (
        <div
            className={styles.searchBar}>
            <form
                className={styles.searchBar__form}
                onSubmit={handleSubmit}
            >
                <button
                    className={styles.searchBar__button}
                    type="submit">
                    <img src={searchIcon} alt="Zoekknop"/>
                </button>
                <input
                    className={styles.searchBar__input}
                    type="search"
                    value={searchInput}
                    placeholder="Zoek op boek, auteur of ISBN"
                    onChange={e => setSearchInput(e.target.value)}
                    />
            </form>
        </div>
    )
}

export default SearchBar;
