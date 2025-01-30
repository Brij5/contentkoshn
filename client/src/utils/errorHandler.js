import { toast } from 'react-toastify';

export const handleApiError = (error) => {
  if (!navigator.onLine) {
    toast.error('No internet connection. Please check your network and try again.');
    return;
  }

  if (error.response) {
    // Server responded with a status code outside the 2xx range
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        toast.error(data.message || 'Invalid request. Please check your input.');
        break;
      case 401:
        toast.error('Session expired. Please log in again.');
        // You might want to trigger a logout action here
        break;
      case 403:
        toast.error('You do not have permission to perform this action.');
        break;
      case 404:
        toast.error(data.message || 'Resource not found.');
        break;
      case 422:
        toast.error(data.message || 'Validation error. Please check your input.');
        break;
      case 429:
        toast.error('Too many requests. Please try again later.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error('An unexpected error occurred. Please try again.');
    }
  } else if (error.request) {
    // Request was made but no response received
    toast.error('Unable to reach the server. Please try again later.');
  } else {
    // Something else happened while setting up the request
    toast.error('An unexpected error occurred. Please try again.');
  }

  // Log the error for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('API Error:', error);
  }
};

export const handleNetworkError = () => {
  toast.error('Network error. Please check your internet connection and try again.');
};

export const handleTimeout = () => {
  toast.error('Request timed out. Please try again.');
};

export const handleValidationError = (errors) => {
  if (Array.isArray(errors)) {
    errors.forEach((error) => {
      toast.error(error.message);
    });
  } else if (typeof errors === 'object') {
    Object.values(errors).forEach((error) => {
      if (Array.isArray(error)) {
        error.forEach((e) => toast.error(e));
      } else {
        toast.error(error);
      }
    });
  } else {
    toast.error('Validation failed. Please check your input.');
  }
};