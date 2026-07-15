import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants/api.jsx';

function getConfig(signal) {
    return {
        headers: {
            'novi-education-project-id': API_KEY,
        },
        signal,
    };
}

export async function libraryService(signal) {
    const config = getConfig(signal);

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



