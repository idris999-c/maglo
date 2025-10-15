import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import http, { ApiError } from '../utils/httpClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('maglo_auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setIsAuthenticated(!!parsed?.token);
        setUser(parsed?.user || null);
      } catch (_) {}
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await http.post('/users/login', { email, password });
      const token = data?.data?.accessToken;
      const userResp = data?.data?.user;
      const nextUser = userResp || null;
      if (!token) throw new Error('Erişim tokenı alınamadı');
      localStorage.setItem('maglo_auth', JSON.stringify({ token, user: nextUser }));
      setUser(nextUser);
      setIsAuthenticated(true);
    } catch (err) {
      const msg = err instanceof ApiError ? err.meta?.data?.message || err.message : err.message;
      throw new Error(msg || 'Giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ fullName, email, password }) => {
    setLoading(true);
    try {
      await http.post('/users/register', { fullName, email, password });
      // Kayıt başarılı ise direkt login akışı kullanıcının tercihine göre yapılabilir
      await login({ email, password });
    } catch (err) {
      const msg = err instanceof ApiError ? err.meta?.data?.message || err.message : err.message;
      throw new Error(msg || 'Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const { data } = await http.post('/users/refresh-token');
      const newToken = data.accessToken;
      
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
      
      return newToken;
    } catch (err) {
      // Refresh token da geçersizse logout
      logout();
      throw err;
    }
  };

  const logout = async () => {
    try {
      await http.post('/users/logout');
    } catch (_) {}
    localStorage.removeItem('maglo_auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = useMemo(() => ({ isAuthenticated, user, login, register, logout, refreshToken, loading }), [isAuthenticated, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


