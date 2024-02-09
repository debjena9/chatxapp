import axios from 'axios';
const API_URL = '/api/users/';

const saveUserDataToLocalStorage = (userData) => {
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    saveUserDataToLocalStorage(response.data);
    return response.data;
  } catch (error) {
    // Handle registration failure (e.g., display an error message)
    console.error('Registration failed:', error);
    throw error;
  }
};

// Logout service
const logout = () => localStorage.removeItem('user');

// Login service
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    saveUserDataToLocalStorage(response.data);
    return response.data;
  } catch (error) {
    // Handle login failure (e.g., display an error message)
    console.error('Login failed:', error?.response?.data?.message);
    throw error;
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
