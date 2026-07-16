import axios from 'axios';

import { API_BASE_URL } from '../constants/api.jsx';
import { getAuthConfig } from '../helpers/configHelper.jsx';

export async function addLoan(loanData, signal) {

    const response = await axios.post(
        `${API_BASE_URL}/loans`,
        loanData,
        getAuthConfig(signal),
    );

    return response.data;
};

export async function getLoans(signal) {
    const response = await axios.get(
        `${API_BASE_URL}/loans`,
        getAuthConfig(signal),
    );

    return response.data;
};

