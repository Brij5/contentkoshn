import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
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

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`);
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

class ApiService {
  constructor(resourcePath) {
    this.resourcePath = resourcePath;
  }

  // Generic CRUD operations
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(this.resourcePath, { params });
      return response.data;
    } catch (error) {
      throw this.handleError('fetching', error);
    }
  }

  async getById(id) {
    try {
      const response = await axiosInstance.get(`${this.resourcePath}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError('fetching', error);
    }
  }

  async create(data) {
    try {
      const response = await axiosInstance.post(this.resourcePath, data);
      return response.data;
    } catch (error) {
      throw this.handleError('creating', error);
    }
  }

  async update(id, data) {
    try {
      const response = await axiosInstance.patch(`${this.resourcePath}/${id}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError('updating', error);
    }
  }

  async delete(id) {
    try {
      const response = await axiosInstance.delete(`${this.resourcePath}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError('deleting', error);
    }
  }

  // Advanced operations
  async search(query) {
    try {
      const response = await axiosInstance.get(`${this.resourcePath}/search`, { params: { query } });
      return response.data;
    } catch (error) {
      throw this.handleError('searching', error);
    }
  }

  async uploadFile(file, onProgress) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.post(`${this.resourcePath}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError('uploading', error);
    }
  }

  async downloadFile(fileId) {
    try {
      const response = await axiosInstance.get(`${this.resourcePath}/download/${fileId}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw this.handleError('downloading', error);
    }
  }

  // Bulk operations
  async bulkCreate(data) {
    try {
      const response = await axiosInstance.post(`${this.resourcePath}/bulk`, data);
      return response.data;
    } catch (error) {
      throw this.handleError('bulk creating', error);
    }
  }

  async bulkUpdate(data) {
    try {
      const response = await axiosInstance.patch(`${this.resourcePath}/bulk`, data);
      return response.data;
    } catch (error) {
      throw this.handleError('bulk updating', error);
    }
  }

  async bulkDelete(ids) {
    try {
      const response = await axiosInstance.delete(`${this.resourcePath}/bulk`, { data: { ids } });
      return response.data;
    } catch (error) {
      throw this.handleError('bulk deleting', error);
    }
  }

  // Export/Import operations
  async export(format = 'csv') {
    try {
      const response = await axiosInstance.get(`${this.resourcePath}/export`, {
        params: { format },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw this.handleError('exporting', error);
    }
  }

  async import(file, onProgress) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.post(`${this.resourcePath}/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError('importing', error);
    }
  }

  // Error handling
  handleError(action, error) {
    console.error(`Error ${action}:`, error);
    const message = error.response?.data?.message || `Failed while ${action}`;
    return new Error(message);
  }
}

// Create service instances
export const authAPI = new ApiService('/auth');
export const usersAPI = new ApiService('/users');
export const servicesAPI = new ApiService('/services');
export const contentAPI = new ApiService('/content');
export const commentsAPI = new ApiService('/comments');
export const contactAPI = new ApiService('/contact');

// Export factory function and instance
export const createApiService = (resourcePath) => new ApiService(resourcePath);
export default axiosInstance;
