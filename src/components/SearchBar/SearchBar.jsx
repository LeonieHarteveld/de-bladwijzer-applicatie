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
                    value={searchInput}
                    placeholder="Zoek op boek, auteur of ISBN"
                    onChange={e => setSearchInput(e.target.value)}
                    />
            </form>
        </div>
    )
}

export default SearchBar;
