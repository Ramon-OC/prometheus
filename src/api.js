import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('titan_token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    console.log("FormData", config.data);
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  return config;
});

export default api;
