import axios, { InternalAxiosRequestConfig } from 'axios';
const PROD_URL = 'https://api.example.com';
const DEV_URL = 'http://localhost:5000';


const resolveBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return PROD_URL;
    } else {
        return DEV_URL;
    }
}

const client = axios.create({
    baseURL: resolveBaseUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error: any) => {
    return Promise.reject(error);
});


export default client;