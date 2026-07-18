import styles from './App.module.scss';
import {Routes, Route, Outlet, Navigate} from 'react-router-dom';
import {useContext} from 'react'


import NavBar from './components/NavBar/NavBar.jsx';

import SignIn from './pages/SignIn/SignIn.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Home from './pages/Home/Home.jsx';
import MyLoans from './pages/MyLoans/MyLoans.jsx';
import Search from './pages/Search/Search.jsx';
import BookDetails from './pages/BookDetails/BookDetails.jsx';
import AddBook from './pages/AddBook/AddBook.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

import {AuthContext} from './context/AuthContext.jsx';

function App() {
    const {isAuth, user} = useContext(AuthContext);
    const canAddBooks = user?.roles?.includes("editor");

    function MainLayout() {
        return (
            <div className={styles.app__inner}>
                <NavBar/>
                <main className={styles.app__main}>
                    <Outlet/>
                </main>
            </div>
        );
    }

    function AuthRouteLayout() {
        return (
            <div className={styles.app__auth}>
                <Outlet/>
            </div>
        );
    }

    return (
        <Routes>
            <Route element={<AuthRouteLayout/>}>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/registreren" element={<SignUp/>}/>
            </Route>

            <Route element={<MainLayout/>}>
                <Route path="/" element={isAuth ? <Home/> : <Navigate to="/login"/>}/>
                <Route path="/mijn-leningen" element={isAuth ? <MyLoans/> : <Navigate to="/login"/>}/>
                <Route path="/zoekpagina" element={isAuth ? <Search/> : <Navigate to="/login"/>}/>
                <Route path="/boek-details/:id" element={isAuth ? <BookDetails/> : <Navigate to="/login"/>}/>
                <Route path="/boek-toevoegen" element={!isAuth ? <Navigate to="/login" replace/> : canAddBooks ? <AddBook/> : <Navigate to="/404" replace/>}/>
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;