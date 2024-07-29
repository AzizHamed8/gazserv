import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ login: 'user' }); // Replace with actual user data from the backend if available
    }
  }, []);

  const login = async (login, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { login, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser({ login });
      history.push('/admin'); // Redirect after successful login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setUser(null); // Réinitialise l'état de l'utilisateur
    history.push('/login'); // Redirige vers la page de connexion
  };

  const isAuthenticated = !!user; // Check if user is authenticated based on presence of user

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
