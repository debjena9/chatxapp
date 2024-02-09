import React, { createContext, useContext, useState, useEffect } from "react";
import { app } from "./config/firebase";
import authService from "./services/authService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function handleAuthRequest(authMethod, ...args) {
    try {
      const user = await authMethod(...args);
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      }
      return user;
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "An error occurred.");
      toast.error(error?.response?.data?.message || "An error occurred.");
      setLoading(false);
      return null;
    }
  }

  const register = (username, email, password) => {
    const userData = { username, email, password };
    return handleAuthRequest(authService.register, userData);
  };

  const login = (email, password) => {
    const userData = { email, password };
    return handleAuthRequest(authService.login, userData);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    setError("");
  };

  const updateUserProfile = (user, profile) => {
    //return updateProfile(user, profile);
  };

  useEffect(() => {
    if (app) setLoading(false);

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setCurrentUser(user);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    error,
    setError,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
