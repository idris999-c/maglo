import axios from 'axios';
import { handleApiError } from './errorHandler';

const BASE_URL = 'https://case.nodelabs.dev/api';

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

function getStoredToken() {
  try {
    const raw = localStorage.getItem('maglo_auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token || null;
  } catch (_) {
    return null;
  }
}

http.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class ApiError extends Error {
  constructor(message, meta) {
    super(message);
    this.name = 'ApiError';
    this.meta = meta;
  }
}

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const data = error?.response?.data;
    const message = data?.message || error?.message || 'An unexpected error occurred';

    // 401 error and not retried before, try refresh token
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Refresh token call
        const { data: refreshData } = await http.post('/users/refresh-token');
        const newToken = refreshData.accessToken;
        
        // Update token in localStorage
        const raw = localStorage.getItem('maglo_auth');
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            localStorage.setItem('maglo_auth', JSON.stringify({ 
              ...parsed, 
              token: newToken 
            }));
          } catch (_) {}
        }
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return http(originalRequest);
        
      } catch (refreshError) {
        // If refresh token also fails, logout
        localStorage.removeItem('maglo_auth');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    // Central error handling
    handleApiError(error);
    throw new ApiError(message, { status, data });
  }
);

export default http;



