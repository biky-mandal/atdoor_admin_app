// This file is for communication with the server. 

import axios from 'axios';
import { API_URL } from '../urlConfig';

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
})

export default axiosInstance;