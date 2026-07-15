import {
    createContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const navigate = useNavigate();

    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });

            return;
        }

        try {
            const user = JSON.parse(storedUser);

            setAuthState({
                isAuth: true,
                user,
                status: 'done',
            });
        } catch (error) {
            console.error(
                'Opgeslagen gebruiker kon niet worden gelezen:',
                error,
            );

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem(
            'user',
            JSON.stringify(user),
        );

        setAuthState({
            isAuth: true,
            user,
            status: 'done',
        });

        navigate('/');
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/');
    }

    const contextData = {
        isAuth: authState.isAuth,
        user: authState.user,
        status: authState.status,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {authState.status === 'done'
                ? children
                : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;