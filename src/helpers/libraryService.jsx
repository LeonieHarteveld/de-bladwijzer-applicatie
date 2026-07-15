import axios from 'axios';

import { API_BASE_URL } from '../constants/api.jsx';
import { getAuthConfig } from '../helpers/configHelper.jsx';

export async function libraryService(signal) {
    const config = getAuthConfig(signal);

    const [
        booksResponse,
        authorsResponse,
        genresResponse,
    ] = await Promise.all([
        axios.get(`${API_BASE_URL}/books`, config),
        axios.get(`${API_BASE_URL}/authors`, config),
        axios.get(`${API_BASE_URL}/genres`, config),
    ]);

    return {
        books: booksResponse.data,
        authors: authorsResponse.data,
        genres: genresResponse.data,
    };
}