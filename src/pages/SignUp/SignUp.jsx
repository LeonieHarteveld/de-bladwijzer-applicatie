import styles from './SignUp.module.scss'
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import AuthFormField from '../../components/AuthFormField/AuthFormField.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';

import {API_BASE_URL, API_KEY} from "../../constants/api.jsx";
import validateAuthInput from '../../helpers/validateAuthInput.js';

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setAuthError('');
        toggleError(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const errorInput = validateAuthInput(
            formData.email,
            formData.password
        );

        if (errorInput) {
            setAuthError(errorInput);
            return;
        }

        setAuthError('');
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post(
                `${API_BASE_URL}/users`,
                {
                    email: formData.email,
                    password: formData.password,
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
                <>
                    Al een account? <Link to="/login">Log hier in</Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} noValidate>
                <AuthFormField
                    id="email"
                    label="E-mailadres"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                />

                <AuthFormField
                    id="password"
                    label="Wachtwoord"
                    type="password"
                    name="password"
                    placeholder="Wachtwoord"
                    value={formData.password}
                    onChange={handleChange}
                    error={authError}
                />

                {error && (
                    <p className={styles.signInForm__error}>
                        Registreren is mislukt. Controleer je gegevens.
                    </p>
                )}

                {error && <p className="error">Inloggen is mislukt. Controleer je gegevens.</p>}

                <PrimaryButton
                    text={loading
                        ? 'Bezig met registreren...'
                        : 'Registreren'}
                    type="submit"
                    fullWidth
                    disabled={loading}
                />
            </form>
        </AuthLayout>
    );
}

export default SignUp