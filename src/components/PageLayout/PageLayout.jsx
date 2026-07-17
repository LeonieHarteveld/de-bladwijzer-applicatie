import styles from './PageLayout.module.scss';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Footer from '../Footer/Footer.jsx';

function PageLayout({title, subtitle, centered = false, showSearchBar = true, children,}) {

    const innerClassName = centered
        ? `${styles.pageLayout__inner} ${styles.pageLayout__innerCentered}`
        : styles.pageLayout__inner;

    return (
        <div className={styles.pageShell}>
            <div className={styles.pageLayout}>
                {showSearchBar && (
                    <div className={styles.pageLayout__searchBar}>
                        <SearchBar/>
                    </div>
                )}
                    {(title || subtitle) && (
                            <main className={styles.pageLayout__inner}>
                                <header className={styles.pageLayout__header}>
                                    {title && <h1>{title}</h1>}
                                    {subtitle && <h2>{subtitle}</h2>}
                                </header>

                                {children}
                            </main>
                    )}

            </div>

            <Footer/>
        </div>
    );
}

export default PageLayout;
