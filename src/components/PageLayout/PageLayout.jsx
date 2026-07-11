import styles from './PageLayout.module.scss'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'

function PageLayout({title, subtitle, centered = false, children}) {
    const innerClass = centered
        ? `${styles.pagelayout__inner} ${styles.pagelayout__innerCentered}`
        : styles.pagelayout__inner;

    return (
        <section
            className={styles.pagelayout}>

            <div className={styles.pagelayout__searchbar}>
                <SearchBar/>
            </div>
            <div className={innerClass}>
                {title && <h1>{title}</h1>}
                {subtitle && <h2>{subtitle}</h2>}
                {children}
            </div>
        </section>
    )
}

export default PageLayout;
