import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants/api.jsx';

export async function getAuthors(signal) {
    const response = await axios.get(`${API_BASE_URL}/authors`, {
        headers: {
            'novi-education-project-id': API_KEY,
        },
        signal,
    });

    return response.data;
}

export async function addAuthor(authorData) {
    const response = await axios.post(`${API_BASE_URL}/authors`,
        authorData, {
            headers: {
                'novi-education-project-id': API_KEY,
            },
        })

    return response.data;
}