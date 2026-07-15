import React, { createContext, useState, useEffect } from 'react';
import { profileService } from '../services/profileService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (userData, jwtToken) => {
    setToken(jwtToken);
    setUser(userData);
    
    // After login, verify the user from the backend
    try {
      const response = await profileService.getProfile(jwtToken);
      if (response && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error verifying user session:', error);
      // If verification fails, we can clear credentials
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const updateProfileStatus = (isCompleted) => {
    if (user) {
      setUser(prev => ({ ...prev, profileCompleted: isCompleted }));
    }
  };

  const value = {
    token,
    user,
    setUser,
    login,
    logout,
    updateProfileStatus,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
