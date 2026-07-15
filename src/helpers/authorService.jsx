import axios from 'axios';

import { API_BASE_URL } from '../constants/api.jsx';
import { getAuthConfig } from '../helpers/configHelper.jsx';

export async function getAuthors(signal) {
    const response = await axios.get(
        `${API_BASE_URL}/authors`,
        getAuthConfig(signal),
    );

    return response.data;
}

export async function addAuthor(authorData, signal) {
    const response = await axios.post(
        `${API_BASE_URL}/authors`,
        authorData,
        getAuthConfig(signal),
    );

    return response.data;
}