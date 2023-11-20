import './Profile.css';
import api from '../api';
import { useAuth } from '../AuthProvider';
import { Container } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

const Perfil = () => {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const respuesta = await api.get(`/profile/${user.id}`);

        if (respuesta.status === 200) {
          setPerfil(respuesta.data);
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

  if (!perfil) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className="perfil-container mt-5">
      <div className="perfil-imagen">
        {perfil.avatar ? (
          <img src={perfil.avatar} alt="Foto de perfil" />
        ) : (
          <FaUserCircle size={200} />
        )}
      </div>
      <div className="perfil-datos">
        <form>
          <label>Nombre:</label>
          <input type="text" value={perfil.name} readOnly />

          <label>Email:</label>
          <input type="email" value={perfil.email} readOnly />
        </form>
        <button className="editar-boton">Editar</button>
      </div>
    </Container>
  );
};

export default Perfil;

