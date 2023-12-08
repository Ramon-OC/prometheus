import './Login.css';
import api from '../api';
import React, { useState } from 'react';
import { useAuth } from '../AuthProvider';
import { useNavigate, Navigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Header from './Header';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }


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
        login(response.data.access_token);
        console.info('Inicio de sesión exitoso', response.data);
        navigate('/profile');
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
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <div className="text-center mb-4">
            <h1 className="font-weight-bold text-dark">Iniciar sesión</h1>
          </div>
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
            <Button type="submit" variant="primary" className="btn btn-primary login-button mt-4">
              Iniciar sesión
            </Button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <p className="pt-4 text-center">
            ¿No tienes una cuenta?{' '}
            <a href="/registro">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
