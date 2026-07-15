import { API_KEY } from '../constants/api.jsx';

export function getAuthConfig(signal) {
    const token = localStorage.getItem('token');

    return {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'novi-education-project-id': API_KEY,
            Authorization: `Bearer ${token}`,
        },
        signal,
    };
}