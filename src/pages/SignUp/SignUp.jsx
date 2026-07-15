import styles from './SignUp.module.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import FormField from '../../components/FormField/FormField.jsx';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton.jsx';

function SignUp() {

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
                    text="Registeren"
                    type="submit"
                    fullWidth
                />
            </form>
        </AuthLayout>
    );
}

export default SignUp