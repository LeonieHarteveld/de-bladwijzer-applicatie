import styles from './NavBar.module.scss'
import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import navImg from '../../assets/images/nav-img.png'
import {
    HomeIcon,
    LoansIcon,
    SearchIcon,
    AddIcon,
    LogoutIcon,
} from "../Icons/Icons.jsx";

function NavBar() {


    return (
        <nav>
            <div className={styles.navbar__inner}>
                <div className={styles.navbar__logo}>
                    <img src={logo} alt="Logo van bibliotheek de Bladwijzer"/>
                </div>

                <ul>
                    <li>
                        <NavLink to="/"
                                 className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                            <HomeIcon />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mijn-leningen"
                                 className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                            <LoansIcon />
                            <span>Mijn leningen</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/zoekpagina"
                                 className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                            <SearchIcon />
                            <span>Zoeken</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/boek-toevoegen"
                                 className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                            <AddIcon />
                            <span>Boek toevoegen</span>
                        </NavLink>
                    </li>
                </ul>
                <div className={styles.navbar__img}>
                    <img src={navImg} alt="Een stapel boeken"/>
                </div>

                {/*<Button>Uitloggen</Button>*/}
            </div>
        </nav>
    )
}

export default NavBar