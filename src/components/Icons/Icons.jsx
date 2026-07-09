import styles from "./Icons.module.scss";

import home from "../../assets/icons/home-icon.svg";
import loans from "../../assets/icons/loan-icon.svg";
import search from "../../assets/icons/search-icon.svg";
import add from "../../assets/icons/add-icon.svg";
import logout from "../../assets/icons/logout-icon.svg";

export function HomeIcon() {
    return <img src={home} alt="" className={styles.icon} />;
}

export function LoansIcon() {
    return <img src={loans} alt="" className={styles.icon} />;
}

export function SearchIcon() {
    return <img src={search} alt="" className={styles.icon} />;
}

export function AddIcon() {
    return <img src={add} alt="" className={styles.icon} />;
}

export function LogoutIcon() {
    return <img src={logout} alt="" className={styles.icon} />;
}