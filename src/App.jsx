import styles from './App.module.css'
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
        <>
            <SignIn />
            <SignUp />
            <Home />
            <MyLoans />
            <Search />
            <BookDetails />
            <AddBook />
            <NotFound />

        </>
    )
}

export default App
