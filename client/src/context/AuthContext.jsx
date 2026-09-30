import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  login as apiLogin,
  register as apiRegister,
  getCurrentUser,
} from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('comiccraft_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('comiccraft_token') || null);
  const [loading, setLoading] = useState(true);

  // Validate session on mount
  useEffect(() => {
    const verifySession = async () => {
      const savedToken = localStorage.getItem('comiccraft_token');
      if (savedToken) {
        try {
          const res = await getCurrentUser();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('comiccraft_user', JSON.stringify(res.user));
          }
        } catch {
          // Token invalid or expired
          logout();
        }
      }
      setLoading(false);
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('comiccraft_token', res.token);
      localStorage.setItem('comiccraft_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await apiRegister(userData);
    if (res.success && res.token) {
      localStorage.setItem('comiccraft_token', res.token);
      localStorage.setItem('comiccraft_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('comiccraft_token');
    localStorage.removeItem('comiccraft_user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('comiccraft_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
