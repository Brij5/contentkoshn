import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or server not responding
      toast.error('Unable to connect to server. Please check your connection.');
      return Promise.reject(new Error('Network error'));
    }

    if (error.response.status === 401) {
      store.dispatch(logout());
      toast.error('Session expired. Please login again.');
    } else if (error.response.status === 404) {
      toast.error('Resource not found');
    } else if (error.response.status >= 500) {
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.patch(`/auth/reset-password/${token}`, { password }),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  getCurrentUser: () => api.get('/auth/me'),
};

// Users endpoints
export const usersAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Content endpoints
export const contentAPI = {
  getContents: () => api.get('/content'),
  getContent: (id) => api.get(`/content/${id}`),
  createContent: (contentData) => api.post('/content', contentData),
  updateContent: (id, contentData) => api.put(`/content/${id}`, contentData),
  deleteContent: (id) => api.delete(`/content/${id}`),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/updatedetails', userData),
  updatePassword: (data) => api.put('/users/updatepassword', data),
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Blog API calls
export const blogAPI = {
  getBlogs: (params) => api.get('/blogs', { params }),
  getBlogById: (id) => api.get(`/blogs/${id}`),
  createBlog: (blogData) => api.post('/blogs', blogData),
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
};

// Contact API calls
export const contactAPI = {
  submitContact: (contactData) => api.post('/contact', contactData),
};

export default api;
