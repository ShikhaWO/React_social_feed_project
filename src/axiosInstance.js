import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optionally add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
            // For example, redirect to login page or refresh token
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;