import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Setup axios interceptors
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = api.interceptors.request.use(
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

    // Response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle token expiration
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          localStorage.removeItem('token');
          setUser(null);
          navigate('/auth/login');
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  // Initialize auth state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching current user:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred during login';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', userData);
      const { message } = response.data;
      
      setError(null);
      return { success: true, message };
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred during registration';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/auth/login');
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      setError(message);
      throw new Error(message);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      setError(null);
      const response = await api.patch(`/auth/reset-password/${token}`, { password });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      setError(message);
      throw new Error(message);
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setError(null);
      const response = await api.patch('/auth/update-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      setError(message);
      throw new Error(message);
    }
  };

  const verifyEmail = async (token) => {
    try {
      setError(null);
      const response = await api.get(`/auth/verify-email/${token}`);
      await getCurrentUser(); // Refresh user data after verification
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      setError(message);
      throw new Error(message);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await api.patch('/auth/update-profile', userData);
      setUser(response.data.data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      setError(message);
      throw new Error(message);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updatePassword,
    verifyEmail,
    updateProfile,
    getCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext; 