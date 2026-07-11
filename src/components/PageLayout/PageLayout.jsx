import styles from './PageLayout.module.scss'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'

function PageLayout ({title, subtitle, children}) {


    return (
        <section
            className={styles.pagelayout}>

            <div className={styles.pagelayout__searchbar}>
                <SearchBar/>
            </div>
            <div
                className={styles.pagelayout__inner}>

                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                {children}
            </div>
        </section>
    )
}

export default PageLayout;
