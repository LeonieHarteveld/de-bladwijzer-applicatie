import styles from './SignIn.module.scss';

import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext.jsx';

import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import FormField from '../../components/FormField/FormField.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';

import {
    API_BASE_URL,
    API_KEY,
} from '../../constants/api.jsx';

function SignIn() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                {
                    "email": email,
                    "password": password
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'novi-education-project-id': API_KEY,
                    },
                },
            );

            login(response.data.token);
        } catch (e) {
            console.error(e);

            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Login"
            footer={
                <>
                    Nog geen account?{' '}
                    <Link to="/registreren">
                        Registreer hier
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <FormField
                    id="email"
                    label="E-mailadres"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />

                <FormField
                    id="password"
                    label="Wachtwoord"
                    type="password"
                    name="password"
                    placeholder="Wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                {error && (
                    <p>
                        Inloggen is mislukt. Controleer je gegevens.
                    </p>
                )}

                <PrimaryButton
                    text={loading ? 'Bezig met inloggen...' : 'Inloggen'}
                    type="submit"
                    fullWidth
                    disabled={loading}
                />
            </form>
        </AuthLayout>
    );
}

export default SignIn;