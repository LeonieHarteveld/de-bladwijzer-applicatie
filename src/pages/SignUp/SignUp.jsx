import styles from './SignUp.module.scss'
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import FormField from '../../components/FormField/FormField.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';
import {API_BASE_URL, API_KEY} from "../../constants/api.jsx";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post(
                `${API_BASE_URL}/users`,
                {
                    email: email,
                    password: password,
                    roles: ['member'],
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'novi-education-project-id': API_KEY,
                    },
                },
            );
            navigate('/login');
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        toggleLoading(false);
    }


    return (
        <AuthLayout
            title="Registeren"
            footer={
                <p>
                    Heb je al een account?{' '}
                    <Link to="/login">
                        Log hier in!
                    </Link>
                </p>
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

                {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}

                <PrimaryButton
                    text={loading ? 'Bezig met inloggen...' : 'Registreren'}
                    type="submit"
                    fullWidth
                    disabled={loading}
                />
            </form>
        </AuthLayout>
    );
}

export default SignUp