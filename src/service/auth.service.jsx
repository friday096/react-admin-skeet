import axios from 'axios';

// Get the base API URL from the environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Create an instance of Axios with the base URL
const axiosInstance = axios.create({
    baseURL: `${API_URL}/auth`,
});

// Auth service
const authService = {
    // Create a new user
    createUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/create', userData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    //login user
    authLogin: async (userData) => {
        try {
            const response = await axiosInstance.post('/login', userData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    // Update user information
    updateUser: async (userId, userData) => {
        try {
            const response = await axiosInstance.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    // Get user information
    getUser: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    // Request a password reset
    requestPasswordReset: async (email) => {
        try {
            const response = await axiosInstance.post('/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    // Reset the password
    resetPassword: async (token, newPassword) => {
        try {
            const response = await axiosInstance.post(`/reset-password/${token}`, { password: newPassword });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    //Verify Token
    verifyToken: async (token) =>{
        try {
            const response = await axiosInstance.get(`/getTokenData`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the Authorization header
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default authService;
