import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

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
};

// Provider API
export const providerAPI = {
    getPatients: () => api.get('/provider/patients'),
    getPatientDetails: (id) => api.get(`/provider/patients/${id}`),
    createReminder: (patientId, data) => api.post(`/provider/patients/${patientId}/reminders`, data),
};

export default api;
