import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import api from '../api';

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    surname: '',
    email: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const response = await api.post('/participant', formData);
      toast.success(`Bienvenido ${response.data.full_name}, hemos enviado tus credenciales de acceso a tu email.`);
      setFormData({
        username: '',
        firstname: '',
        lastname: '',
        surname: '',
        email: '',
      });
      setValidated(false);
    } catch (error) {
      console.error("Error al agregar participante:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Hubo un error al registrarse, intenta nuevamente');
      }
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="mt-5" fluid style={{ maxWidth: '600px' }}>
        <div className="registro-container">
          <div className="registro-box">
            <div className="text-center mb-4">
              <h1 className="font-weight-bold">Registrarse</h1>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3 w-100" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required/>
                <Form.Control.Feedback type="invalid">Por favor, ingresa un nombre de usuario.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 w-100" controlId="firstname">
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control type="text" name="firstname" placeholder="Nombre o Nombres" value={formData.firstname} onChange={handleInputChange} required/>
                <Form.Control.Feedback type="invalid">Por favor, ingresa tu nombre o nombres.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 w-100" controlId="lastname">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control type="text" name="lastname" placeholder="Apellido Paterno" value={formData.lastname} onChange={handleInputChange} required/>
                <Form.Control.Feedback type="invalid">Por favor, ingresa tu apellido materno.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 w-100" controlId="surname">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control type="text" name="surname" placeholder="Apellido Materno" value={formData.surname} onChange={handleInputChange} required/>
                <Form.Control.Feedback type="invalid">Por favor, ingresa tu apellido paterno.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 w-100" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required/>
                <Form.Control.Feedback type="invalid">Por favor, ingresa un email valido.</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="w-100 mt-4">Registrarse</Button>
              {error && <p className="error-message">{error}</p>}
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
