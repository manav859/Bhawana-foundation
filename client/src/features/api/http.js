import axios from 'axios';
import { getStoredSession } from '@/features/auth/auth.storage.js';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const session = getStoredSession();

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server provided a structured error response, pass it through
    if (error.response?.data) {
      return Promise.reject(error);
    }
    const message = error?.message || 'An unexpected API error occurred.';
    return Promise.reject(new Error(message));
  },
);