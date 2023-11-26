import api from '../api';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CButton } from '@coreui/react';
import { FaTrash } from 'react-icons/fa';
import { notifySuccess, notifyError } from '../notificationUtils';

const DeleteAdminModal = ({ show, handleClose, handleDelete, admin }) => {
  if (!admin) return null;

  const deleteAdmin = async () => {
    try {
      const response = await api.delete(`/admin/${admin.id}`);
      if (response.status === 200) {
        handleDelete(admin);
        handleClose();
        notifySuccess(`Administrador ${admin.name} eliminado exitosamente`);
      }
    } catch (error) {
      console.error('Error al eliminar al administrador', error);
      notifyError(`Error al eliminar al administrador ${admin.name}`);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que deseas eliminar al administrador <strong>{admin.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <CButton color="danger" onClick={deleteAdmin}>
          Eliminar
        </CButton>
        <CButton color="secondary" onClick={handleClose}>
          Cancelar
        </CButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAdminModal;
