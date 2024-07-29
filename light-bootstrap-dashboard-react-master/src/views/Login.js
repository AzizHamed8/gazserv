import React, { useState } from 'react';
import { useAuth } from '../auth/auth-context';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(login, password);
  };

  return (
    <div className="login-container">
    
      <div className="login-form">
        <img src={require("assets/img/logo.png")} alt="Logo" className="login-image" />
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login">Login:</label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
