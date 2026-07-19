import styles from './SignIn.module.scss';

import axios from 'axios';
import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import {AuthContext} from '../../context/AuthContext.jsx';

import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import AuthFormField from '../../components/AuthFormField/AuthFormField.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';

import {API_BASE_URL, API_KEY} from '../../constants/api.jsx';
import validateAuthInput from '../../helpers/validateAuthInput.js';

function SignIn() {
    const {login} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [authError, setAuthError] = useState('');

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
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'novi-education-project-id': API_KEY,
                    },
                }
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

                {error && <p className="error">Inloggen is mislukt. Controleer je gegevens.</p>}

                <PrimaryButton
                    text={
                        loading
                            ? 'Bezig met inloggen...'
                            : 'Inloggen'
                    }
                    type="submit"
                    fullWidth
                    disabled={loading}
                />
            </form>
        </AuthLayout>
    );
}

export default SignIn;