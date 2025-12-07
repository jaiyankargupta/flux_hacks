import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // If we get a 401 error, clear the token and redirect to login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Only redirect if we're not already on login/register pages
            const currentPath = window.location.pathname;
            if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
};

// Patient API
export const patientAPI = {
    getDashboard: () => api.get('/patient/dashboard'),
    updateGoals: (goals) => api.post('/patient/goals', goals),
    getGoalHistory: (days = 7) => api.get(`/patient/goals/history?days=${days}`),
    getReminders: () => api.get('/patient/reminders'),
    completeReminder: (id) => api.put(`/patient/reminders/${id}/complete`),
    getProviders: () => api.get('/patient/providers'),
    getAssignedProvider: () => api.get('/patient/provider'),
    selectProvider: (providerId) => api.post(`/patient/provider/${providerId}`),
};

// Provider API
export const providerAPI = {
    getPatients: () => api.get('/provider/patients'),
    getPatientDetails: (id) => api.get(`/provider/patients/${id}`),
    createReminder: (patientId, data) => api.post(`/provider/patients/${patientId}/reminders`, data),
};

// Admin API
export const adminAPI = {
    // Dashboard stats
    getStats: () => api.get('/admin/stats'),

    // Provider management
    getAllProviders: () => api.get('/admin/providers'),
    getProvider: (id) => api.get(`/admin/providers/${id}`),
    createProvider: (data) => api.post('/admin/providers', data),
    updateProvider: (id, data) => api.put(`/admin/providers/${id}`, data),
    deleteProvider: (id) => api.delete(`/admin/providers/${id}`),
    resetProviderPassword: (id, newPassword) => api.put(`/admin/providers/${id}/reset-password`, { newPassword }),

    // Patient management
    getAllPatients: () => api.get('/admin/patients'),
};

export const messageAPI = {
    getMessages: (userId) => api.get(`/messages/${userId}`),
};

export default api;
