import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout');
      // Supprimer le token du stockage local ou des cookies
      localStorage.removeItem('token'); // ou Cookies.remove('token') si vous utilisez des cookies
      // Rediriger vers la page de connexion
      history.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
