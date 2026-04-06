import axios from 'axios';
import { getStoredSession } from '@/features/auth/auth.storage.js';
import { getStoredBuyerSession } from '@/features/buyer-auth/buyer-auth.storage.js';

function getBaseURL() {
  // If an env var is set AND we're in production build, use it
  if (import.meta.env.VITE_API_URL && import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL;
  }
  // Auto-detect: localhost → local backend, anything else → Render
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isLocal
    ? 'http://localhost:5000/api/v1'
    : 'https://bhawana-foundation.onrender.com/api/v1';
}

export const http = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  // 1. If explicit Authorization was passed (e.g. via withBuyerAuth), skip interceptor logic
  if (config.headers.Authorization) {
    return config;
  }

  // 2. Try Admin session
  const adminSession = getStoredSession();
  if (adminSession?.token) {
    config.headers.Authorization = `Bearer ${adminSession.token}`;
    return config;
  }

  // 3. Try Buyer session
  const buyerSession = getStoredBuyerSession();
  if (buyerSession?.token) {
    config.headers.Authorization = `Bearer ${buyerSession.token}`;
    return config;
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