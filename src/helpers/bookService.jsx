import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants/api.jsx';

export async function getBooks(signal) {
    const response = await axios.get(`${API_BASE_URL}/books`, {
        headers: {
            'novi-education-project-id': API_KEY,
        },
        signal,
    });

    return response.data;
}
