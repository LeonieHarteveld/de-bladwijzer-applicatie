import styles from './AuthLayout.module.scss'
import visual from "../../assets/images/loginimg.png"
import logo from "../../assets/images/logo.png"
import Footer from "../../components/Footer/Footer.jsx"

function AuthLayout({title, footer, children}) {

    return (
        <div
        className={styles.authpage}>
            <main
                className={styles.auth}>
                <section
                    className={styles.auth__panel}
                >
                    <img src={logo} alt="Logo biblitoheek de Bladwijzer"/>

                    <div
                        className={styles.auth__content}>
                        <h1>{title}</h1>
                        {children}
                        <p>{footer}</p>
                    </div>
                </section>
                <section
                    className={styles.auth__visual}>
                    <img
                        src={visual}
                        alt="Afbeelding van bibliotheekasten met boeken"
                    />
                </section>
            </main>

            <Footer/>
        </div>
    )
}

export default AuthLayout