import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

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

  const login = async ({ email, password, name }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const fakeToken = 'maglo-demo-token';
    const nextUser = { email, name: name || email.split('@')[0] };
    localStorage.setItem('maglo_auth', JSON.stringify({ token: fakeToken, user: nextUser }));
    setUser(nextUser);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('maglo_auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = useMemo(() => ({ isAuthenticated, user, login, logout, loading }), [isAuthenticated, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


