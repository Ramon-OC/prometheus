import './Login.css';
import api from '../api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', formData)
      if (response.status >= 200 && response.status < 300) {
        setError('');
        localStorage.setItem('access_token', response.data.access_token);
        console.info('Inicio de sesión exitoso', response.data);
        navigate('/');
      }
    } catch (error) {
      console.log("error", error.response);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError(`Error de autenticación: ${error.response.data.error}`);
        console.error('Inicio de sesión fallido', error.response.status);
      } else {
        setError('Error de red. Inténtalo de nuevo más tarde.');
        console.error('Error de red:', error);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary login-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
