import styles from './PageLayout.module.scss';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Footer from '../Footer/Footer.jsx';

function PageLayout({title, subtitle, centered = false, showSearchBar = true, card= false, children,}) {

    const innerClassName = [
        styles.pageLayout__inner,
        centered ? styles.pageLayout__innerCentered : '',
        card ? styles.pageLayout__innerCard : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={styles.pageShell}>
            <div className={styles.pageLayout}>
                {showSearchBar && (
                    <div className={styles.pageLayout__searchBar}>
                        <SearchBar/>
                    </div>
                )}
                <main className={innerClassName}>
                    {(title || subtitle) && (
                        <header className={styles.pageLayout__header}>
                            {title && <h1>{title}</h1>}
                            {subtitle && <h2>{subtitle}</h2>}
                        </header>
                    )}

                    {children}
                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default PageLayout;
