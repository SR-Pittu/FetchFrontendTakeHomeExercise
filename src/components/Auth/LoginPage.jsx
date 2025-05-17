import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import '../../index/Login.css';

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(name, email);
      onLogin();
      navigate('/search');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="card">
          <h1 className="title">Login to Fetch!</h1>
          <h2 className="description">Find your perfect dog.</h2>
  
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className="input"
                placeholder="Your Name"
              />
            </div>
  
            <div className="input-group">
              <label  htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="input"
                placeholder="you@example.com"
              />
            </div>
  
            <button type="submit" disabled={isLoading} className="button">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
  
            {error && <div className="alert">⚠️ {error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;
