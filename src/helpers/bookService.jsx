import axios from 'axios';

import { API_BASE_URL } from '../constants/api.jsx';
import { getAuthConfig } from '../helpers/configHelper.jsx';

export async function getBooks(signal) {
    const response = await axios.get(
        `${API_BASE_URL}/books`,
        getAuthConfig(signal),
    );

    return response.data;
}

export async function addBook(bookData, signal) {
    const response = await axios.post(
        `${API_BASE_URL}/books`,
        bookData,
        getAuthConfig(signal),
    );

    return response.data;
}

export async function updateBookAvailability(bookId, available, signal) {
    const response = await axios.patch(
        `${API_BASE_URL}/books/${bookId}`,
        { available },
        getAuthConfig(signal),
    );

    return response.data;
}