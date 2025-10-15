import axios from 'axios';

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
    const message = data?.message || error?.message || 'Beklenmeyen bir hata oluştu';

    // 401 hatası ve daha önce retry edilmemişse refresh token dene
    if (status === 401 && !originalRequest._retry) {
      console.log('🔄 Token süresi bitti, refresh token deneniyor...');
      originalRequest._retry = true;
      
      try {
        // Refresh token çağrısı
        console.log('🔄 /users/refresh-token çağrısı yapılıyor...');
        const { data: refreshData } = await http.post('/users/refresh-token');
        const newToken = refreshData.accessToken;
        console.log('✅ Yeni access token alındı:', newToken.substring(0, 20) + '...');
        
        // localStorage'daki token'ı güncelle
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
        
        // Orijinal isteği yeni token ile tekrarla
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        console.log('🔄 Orijinal istek yeni token ile tekrarlanıyor...');
        return http(originalRequest);
        
      } catch (refreshError) {
        // Refresh token da başarısızsa logout
        console.log('❌ Refresh token başarısız, logout yapılıyor...');
        localStorage.removeItem('maglo_auth');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    throw new ApiError(message, { status, data });
  }
);

export default http;



