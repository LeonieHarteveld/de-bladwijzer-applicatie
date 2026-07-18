import styles from './AuthLayout.module.scss'
import visual from "../../assets/images/loginimg.png"
import logo from "../../assets/images/logo.png"

function AuthLayout({ title, footer, children }) {
    return (
        <div className={styles.authpage}>
            <main className={styles.auth}>
                <section className={styles.auth__panel}>
                    <div className={styles.auth__content}>
                        <img
                            className={styles.auth__logo}
                            src={logo}
                            alt="Logo bibliotheek De Bladwijzer"
                        />

                        <h1>{title}</h1>

                        {children}

                        <p>{footer}</p>
                    </div>
                </section>

                <section className={styles.auth__visual}>
                    <img
                        src={visual}
                        alt="Bibliotheekkasten met boeken"
                    />
                </section>
            </main>
        </div>
    );
}
export default AuthLayout;