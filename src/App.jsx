import styles from './App.module.scss';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import MyLoans from './pages/MyLoans/MyLoans';
import Search from './pages/Search/Search';
import BookDetails from './pages/BookDetails/BookDetails';
import AddBook from './pages/AddBook/AddBook';
import NotFound from './pages/NotFound/NotFound';

function App() {


    return (
        <div className={styles.app__inner}>
            <div className={styles.app__navbar}>
            <NavBar/>
            </div>
            <main className={styles.app__main}>
                <Routes>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/registreren" element={<SignUp/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/mijn-leningen" element={<MyLoans/>}/>
                    <Route path="/zoekpagina" element={<Search/>}/>
                    <Route path="/boek-details/:id" element={<BookDetails/>}/>
                    <Route path="/boek-toevoegen" element={<AddBook/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                {/*    footer komt nog*/}
            </main>
        </div>
    )
}

export default App;

