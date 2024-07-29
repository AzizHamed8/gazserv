import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      // Optionnel: Si vous avez un endpoint pour déconnexion côté serveur
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
