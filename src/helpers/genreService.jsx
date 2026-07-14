import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants/api.jsx';

export async function getGenres(signal) {
    const response = await axios.get(`${API_BASE_URL}/genres`, {
        headers: {
            'novi-education-project-id': API_KEY,
        },
        signal,
    });

    return response.data;
}


export function sortGenresByName(genres) {
    return [...genres].sort((genreA, genreB) =>
        genreA.name.localeCompare(genreB.name)
    );
}