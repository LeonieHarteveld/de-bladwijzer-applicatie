function validateAuthInput(email, password) {
    if (email.trim() === '' || password.trim() === '') {
        return 'Vul alle velden in';
    }

    const validEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmailFormat) {
        return 'Geen geldig e-mailadres';
    }

    if (password.length < 6) {
        return 'Wachtwoord moet minimaal 6 tekens bevatten';
    }

    return '';
}

export default validateAuthInput;