import './Profile.css';
import api from '../api';
import { useAuth } from '../AuthProvider';
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import { notifySuccess, notifyError } from '../notificationUtils';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Perfil = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const initialFormData = {
    username: '',
    firstname: '',
    lastname: '',
    surname: '',
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [originalFormData, setOriginalFormData] = useState({ ...initialFormData });
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const respuesta = await api.get(`/profile/${user.id}`);
        if (respuesta.status === 200) {
          setFormData(respuesta.data);
          setOriginalFormData(respuesta.data);
        } else {
          // Manejo de errores...
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    if (user) {
      obtenerPerfil();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('firstname', formData.firstname);
      formDataToSend.append('lastname', formData.lastname);
      formDataToSend.append('surname', formData.surname);
      formDataToSend.append('avatar', formData.avatar);
      const response = await api.post(`/user/${formData.id}`, formDataToSend);
      if (response.status === 200) {
        setEditing(false);
        setOriginalFormData({ ...response.data });
        notifySuccess(`${response.data.firstname}, tu perfil fue actualizado exitósamente`);
      }
    } catch (error) {
      notifyError(`Error al editar el perfil ${formData.firstname}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEditing(true);
    setOriginalFormData({ ...formData });
  };

  const handleCancel = () => {
    setEditing(false);
    setAvatarPreview(null);
    setFormData({ ...originalFormData });
  };

  const handleDelete = () => {
    console.log("Delete", formData);
  };

  const handleAvatarChange = (e) => {
    const newAvatar = e.target.files[0];
    setFormData({ ...formData, avatar: newAvatar });
    setAvatarPreview(newAvatar ? URL.createObjectURL(newAvatar) : null);
  };

  if (!formData) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Row className="justify-content-center">
        <Col md={6} className="d-flex">
          <div className="d-flex flex-column align-items-center position-relative">
            <div className="perfil-imagen position-relative text-center pt-4">
              {avatarPreview || formData.avatar ? (
                <img
                  src={avatarPreview || formData.avatar}
                  alt="Foto de perfil"
                  className="img-fluid rounded-circle"
                  style={{ width: '200px', height: '200px' }}
                />
              ) : (
                <FaUserCircle size={200} />
              )}
              {editing && (
                <div className="edit-overlay-container position-absolute bottom-0 end-0">
                  <div className="edit-overlay p-2 rounded-circle bg-light d-flex align-items-center justify-content-center">
                    <label htmlFor="inputAvatar" className="edit-label text-center">
                      <FaCamera size={25} />
                    </label>
                    <input id="inputAvatar" type="file" onChange={handleAvatarChange} style={{ display: "none" }} />
                  </div>
                </div>
              )}
            </div>
            <div className="text-center mb-3 font-weight-bold fs-4 fw-bold pt-2">
              {formData.username}
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="perfil-datos">
            <Form>
              <Form.Group controlId="firstname">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  disabled={!editing}
              />
              </Form.Group>
    
              <Form.Group controlId="lastname">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu apellido paterno"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  disabled={!editing}
              />
              </Form.Group>
    
              <Form.Group controlId="surname">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu apellido materno"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  disabled={!editing}
              />
              </Form.Group>
    
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} disabled />
              </Form.Group>
              <Row className="justify-content-end">
                <Col md={6}>
                  { editing
                    ? (<Button variant="primary" onClick={handleSubmit} className="w-100">Guardar Perfil</Button>)
                    : (<Button variant="warning" onClick={handleEdit} className="w-100">Editar perfil</Button>)
                  }
                </Col>
                <Col md={6}>
                  { editing
                    ? (<Button variant="secondary" onClick={handleCancel} className="w-100">Cancelar</Button>)
                    : (<Button variant="danger" onClick={handleDelete} className="w-100">Eliminar perfil</Button>)
                  }
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;

