import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getServices = () => api.get('/services');
export const getTestimonials = () => api.get('/testimonials');
export const getBlogs = () => api.get('/blogs');
