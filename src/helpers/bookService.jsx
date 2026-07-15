import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants/api.jsx';
import { AuthContext } from '../context/AuthContext';

export async function getBooks(signal) {
    const { user } = useContext(AuthContext);

    const response = await axios.get(`${API_BASE_URL}/books`, {
        headers: {
            'novi-education-project-id': API_KEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        signal,
    });

    return response.data;
}

export async function addBook(bookData) {
    const response = await axios.post(`${API_BASE_URL}/books`,
        bookData, {
        headers: {
            'novi-education-project-id': API_KEY,
        },
    })

    return response.data;
}

export async function updateBook(bookData) {
    const response = await axios.put(`${API_BASE_URL}/books/${bookData.id}`,
        bookData, {
            headers: {
                'novi-education-project-id': API_KEY,
            }
        },);
    return response.data;
}