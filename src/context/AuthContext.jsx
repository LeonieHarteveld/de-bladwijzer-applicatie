import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {API_BASE_URL, API_KEY,} from '../constants/api.jsx';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();

    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });

            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            void fetchUserData(
                decodedToken.userId,
                token,
            );
        } catch (e) {
            console.error(e);

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);


    function login(JWT) {
        try {
            const decodedToken = jwtDecode(JWT);

            localStorage.setItem('token', JWT);

            void fetchUserData(
                decodedToken.userId,
                JWT,
            );

            navigate('/');
        } catch (e) {
            console.error(e);

            localStorage.removeItem('token');

            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/login');
    }

    async function fetchUserData(
        id,
        token,
    ) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/users/${id}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type':
                            'application/json',
                        'novi-education-project-id':
                        API_KEY,
                        Authorization:
                            `Bearer ${token}`,
                    },
                },
            );

            const decodedToken = jwtDecode(token);

            setAuthState({
                isAuth: true,
                user: {
                    id:
                        response.data.id ??
                        decodedToken.userId,
                    email:
                        response.data.email ??
                        decodedToken.email,
                    roles:
                        response.data.roles ??
                        [decodedToken.role],
                },
                status: 'done',
            });
        } catch (e) {
            console.error(e);

            localStorage.removeItem('token');

            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        ...authState,
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