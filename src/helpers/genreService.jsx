import axios from 'axios';

import { API_BASE_URL } from '../constants/api.jsx';
import { getAuthConfig } from '../helpers/configHelper.jsx';

export async function getGenres(signal) {
    const response = await axios.get(
        `${API_BASE_URL}/genres`,
        getAuthConfig(signal),
    );

    return response.data;
}

export function sortGenresByName(genres) {
    return [...genres].sort((genreA, genreB) =>
        genreA.name.localeCompare(genreB.name),
    );
}