import styles from './SignIn.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import FormField from '../../components/FormField/FormField.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';


function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
    }



    return (
        <AuthLayout
            title="Login"
            footer={
                <p>
                    Nog geen account?{' '}
                    <Link to="/registreren">
                        Registreer hier
                    </Link>
                </p>
            }
        >
            <form
                onSubmit={handleSubmit}
            >
                <FormField
                    id="email"
                    label="E-mailadres"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                />

                <FormField
                    id="password"
                    label="Wachtwoord"
                    type="password"
                    name="password"
                    placeholder="Wachtwoord"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                />

                <PrimaryButton
                    text="Inloggen"
                    type="submit"
                    fullWidth
                />
            </form>
        </AuthLayout>
    );
}

export default SignIn;