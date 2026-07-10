import styles from './NavBar.module.scss'
import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import logoMobile from '../../assets/images/logo-mobile.png'
import navImg from '../../assets/images/nav-img.png'
import hamburger from '../../assets/icons/hamburger-icon.svg'
import {
    HomeIcon,
    LoansIcon,
    SearchIcon,
    AddIcon,
    LogoutIcon,
} from "../Icons/Icons.jsx";

function NavBar() {
    const [menuOpen, toggleMenuOpen] = useState(false)

    const handleNavClick = () => {
        if (window.innerWidth <= 768) {
            toggleMenuOpen(false);
        }
    };

    return (
        <nav>
            <div className={styles.navbar__wrapper}>
            <div className={styles.navbar__top}>
                <div className={styles.navbar__logo}>
                    <NavLink to="/" onClick={handleNavClick}>
                    <img
                    className={styles.desktopLogo}
                        src={logo}
                    alt="Logo van bibliotheek de Bladwijzer"/>

                    <img
                        className={styles.mobileLogo}
                        src={logoMobile}
                        alt="Logo van bibliotheek de Bladwijzer"/>
                    </NavLink>
                </div>

                <button
                    type="button"
                    className={styles.navbar__hamburgerButton}
                    onClick={() => toggleMenuOpen(!menuOpen)}>
                    <img
                        className={styles.navbar__hamburgericon}
                        src={hamburger}
                        alt="Hamburger menuknop"/>
                </button>
            </div>

            <div
                className={`${styles.navbar__inner} ${
                    menuOpen ? styles.navbar__innerOpen : ""
                }`}>
                <ul>
                    <li>
                        <NavLink to="/"
                                 className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}
                                 onClick={handleNavClick}>
                            <HomeIcon/>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mijn-leningen"
                                 className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}
                                 onClick={handleNavClick}>
                            <LoansIcon/>
                            <span>Mijn leningen</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/zoekpagina"
                                 className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}
                                 onClick={handleNavClick}>
                            <SearchIcon/>
                            <span>Zoeken</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/boek-toevoegen"
                                 className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}
                                 onClick={handleNavClick}>
                            <AddIcon/>
                            <span>Boek toevoegen</span>
                        </NavLink>
                    </li>
                </ul>
                <div className={styles.navbar__img}>
                    <img src={navImg} alt="Een stapel boeken"/>
                </div>

                <button
                    className={styles.navbar__logout}
                >
                    <LogoutIcon />
                    <span>Uitloggen</span>
                </button>
            </div>
            </div>
        </nav>
    )
}

export default NavBar