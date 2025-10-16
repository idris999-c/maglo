import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import http, { ApiError } from '../utils/httpClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);

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

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await http.post('/users/login', { email, password });
      const token = data?.data?.accessToken;
      const userResp = data?.data?.user;
      const nextUser = userResp || null;
      if (!token) throw new Error('Access token could not be obtained');
      localStorage.setItem('maglo_auth', JSON.stringify({ token, user: nextUser }));
      setUser(nextUser);
      setIsAuthenticated(true);
      setShowWelcomeAnimation(true);
    } catch (err) {
      const msg = err instanceof ApiError ? err.meta?.data?.message || err.message : err.message;
      throw new Error(msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await http.post('/users/logout');
    } catch (_) {}
    localStorage.removeItem('maglo_auth');
    setIsAuthenticated(false);
    setUser(null);
    setShowWelcomeAnimation(false);
  }, []);

  const hideWelcomeAnimation = useCallback(() => {
    setShowWelcomeAnimation(false);
  }, []);

  const register = useCallback(async ({ fullName, email, password }) => {
    setLoading(true);
    try {
      await http.post('/users/register', { fullName, email, password });
      // If registration is successful, direct login flow can be done according to user preference
      const { data } = await http.post('/users/login', { email, password });
      const token = data?.data?.accessToken;
      const userResp = data?.data?.user;
      const nextUser = userResp || null;
      if (!token) throw new Error('Access token could not be obtained');
      localStorage.setItem('maglo_auth', JSON.stringify({ token, user: nextUser }));
      setUser(nextUser);
      setIsAuthenticated(true);
      setShowWelcomeAnimation(true);
    } catch (err) {
      const msg = err instanceof ApiError ? err.meta?.data?.message || err.message : err.message;
      throw new Error(msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const { data } = await http.post('/users/refresh-token');
      const newToken = data.accessToken;
      
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
      
      return newToken;
    } catch (err) {
      // If refresh token is invalid, logout
      logout();
      throw err;
    }
  }, [logout]);

  const value = useMemo(() => ({ isAuthenticated, user, login, register, logout, refreshToken, loading, showWelcomeAnimation, hideWelcomeAnimation }), [isAuthenticated, user, loading, login, register, logout, refreshToken, showWelcomeAnimation, hideWelcomeAnimation]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


