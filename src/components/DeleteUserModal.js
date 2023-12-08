import api from '../api';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CButton } from '@coreui/react';
import { FaTrash } from 'react-icons/fa';
import { notifySuccess, notifyError } from '../notificationUtils';

const DeleteUserModal = ({ show, handleClose, handleDelete, user }) => {
  if (!user) return null;

  const deleteUser = async () => {
    try {
      await api.delete(`/participant/${user.id}`);
      handleDelete(user);
      handleClose();
    } catch (error) {
      console.error('Error al eliminar perfil', error);
      notifyError(`Error al eliminar el perfil ${user.full_name}`);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <strong>{ user.full_name }</strong> ¿Estás seguro que deseas eliminar tu perfil y toda la información relacionada? Podrías perder tus avances en todos los torneos que estes inscrito.
      </Modal.Body>
      <Modal.Footer>
        <CButton color="danger" onClick={deleteUser}>
          Eliminar
        </CButton>
        <CButton color="secondary" onClick={handleClose}>
          Cancelar
        </CButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
