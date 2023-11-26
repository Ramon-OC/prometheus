import api from '../api';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CButton } from '@coreui/react';
import { FaTrash } from 'react-icons/fa';
import { notifySuccess, notifyError } from '../notificationUtils';

const DeleteTournamentModal = ({ show, handleClose, handleDelete, tournament }) => {
  if (!tournament) return null;

  const deleteTournament = async () => {
    try {
      const response = await api.delete(`/tournament/${tournament.id}`);
      if (response.status === 200) {
        handleDelete(tournament);
        handleClose();
        notifySuccess(`Torneo ${tournament.name} eliminado exitosamente`);
      }
    } catch (error) {
      console.error('Error al eliminar el torneo', error);
      notifyError(`Error al eliminar el torneo ${tournament.name}`);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que deseas eliminar el torneo <strong>{tournament.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <CButton color="danger" onClick={deleteTournament}>
          Eliminar
        </CButton>
        <CButton color="secondary" onClick={handleClose}>
          Cancelar
        </CButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTournamentModal;
