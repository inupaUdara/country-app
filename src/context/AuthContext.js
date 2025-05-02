// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import { login, register, logout } from '../services/auth';
import { jwtDecode } from '../utils/jwt';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('user'));
        
        if (token && userData) {
          // Verify token expiration (client-side check)
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            throw new Error('Token expired');
          }
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = useCallback(async (credentials) => {
    try {
      const userData = await login(credentials);
      setUser(userData.user);
      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Login failed.';
      return { success: false, error: message };
    }
  }, []);

  const handleRegister = useCallback(async (userData) => {
    try {
      const registeredUser = await register(userData);
      setUser(registeredUser.user);
      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Login failed.';
      return { success: false, error: message };
    }
  }, []);

  const handleLogout = useCallback(() => {
    try {
      logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const value = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};