import styles from './App.module.scss';
import { Routes, Route, Outlet } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar.jsx';

import SignIn from './pages/SignIn/SignIn.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Home from './pages/Home/Home.jsx';
import MyLoans from './pages/MyLoans/MyLoans.jsx';
import Search from './pages/Search/Search.jsx';
import BookDetails from './pages/BookDetails/BookDetails.jsx';
import AddBook from './pages/AddBook/AddBook.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

function MainLayout() {
    return (
        <div className={styles.app__inner}>
            <NavBar />
            <main className={styles.app__main}>
                <Outlet />
            </main>
        </div>
    );
}

function AuthRouteLayout() {
    return (
        <div className={styles.app__auth}>
            <Outlet />
        </div>
    );
}

function App() {
    return (
        <Routes>
            {/* Zonder navigatie, met footer */}
            <Route element={<AuthRouteLayout />}>
                <Route path="/login" element={<SignIn />} />
                <Route path="/registreren" element={<SignUp />} />
            </Route>

            {/* Met navigatie en footer */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/mijn-leningen" element={<MyLoans />} />
                <Route path="/zoekpagina" element={<Search />} />
                <Route path="/boek-details/:id" element={<BookDetails />}/>
                <Route path="/boek-toevoegen" element={<AddBook />}/>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;