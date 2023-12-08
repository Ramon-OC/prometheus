import api from '../api';
import React, { useState } from 'react';
import { CButton, CSpinner } from '@coreui/react';
import { notifySuccess, notifyError } from '../notificationUtils';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const EditTournamentModal = ({ show, toggle, tournament, onSave }) => {
  const [showLoading, setLoading] = useState(false);
  const [tournamentData, setTournamentData] = useState(tournament ? { ...tournament } : null);
  console.log("edited", tournamentData);

  if (!tournament) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, value);
    setTournamentData({ ...tournamentData, [name]: value, });
  };

  const handleInputChangeRules = (e, index) => {
    const newRules = [...tournament.rules];
    newRules[index] = e.target.value;
    setTournamentData({ ...tournament, rules: newRules });
  };

  const addRule = () => {
    setTournamentData({ ...tournament, rules: [...tournament.rules, ''] });
  };

  const deleteRule = (index) => {
    const newRules = [...tournament.rules];
    newRules.splice(index, 1);
    setTournamentData({ ...tournament, rules: newRules });
  };

  const editTournament = async () => {
    try {
      setLoading(true);
      const response = await api.put(`/tournament/${tournament.id}`, tournamentData);
      if (response.status === 200) {
        onSave(tournamentData);
        toggle();
        notifySuccess(`Torneo ${tournament.name} editado exitosamente`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error al editar el torneo', error);
      notifyError(`Error al editar el torneo ${tournament.name}`);
    }
  };

  return (
    <Modal show={show} onHide={toggle} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Editar Torneo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group className="mb-3 w-100" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="name" value={tournamentData.name} onChange={handleInputChange} />
        </Form.Group>
 
        <Form.Group className="mb-3 w-100" controlId="console">
          <Form.Label>Consola</Form.Label>
          <Form.Control type="text" name="console" value={tournamentData.console} onChange={handleInputChange} />
        </Form.Group>
 
        <Form.Group className="mb-3 w-100" controlId="videogame">
          <Form.Label>Videojuego</Form.Label>
          <Form.Control type="text" name="videogame" value={tournamentData.videogame} onChange={handleInputChange} />
        </Form.Group>
 
        <Form.Group className="mb-3 w-100" controlId="participants_number">
          <Form.Label>No. Participantes</Form.Label>
          <Form.Control type="number" name="participants_number" value={tournamentData.participants_number} onChange={handleInputChange} />
        </Form.Group>
 
        <Form.Group className="mb-3 w-100" controlId="start_date">
          <Form.Label>Fecha de inicio</Form.Label>
          <Form.Control type="datetime-local" name="start_date" value={tournamentData.start_date} onChange={handleInputChange} />
        </Form.Group>
 
        <Form.Group className="mb-3 w-100" controlId="end_date">
          <Form.Label>Fecha de finalización</Form.Label>
          <Form.Control type="datetime-local" name="end_date" value={tournamentData.end_date} onChange={handleInputChange} />
        </Form.Group>
 
        {tournamentData.rules.map((rule, index) => (
          <div key={index} className="mb-3 w-100">
            <Form.Label>{`Regla ${index + 1}`}</Form.Label>
            <InputGroup>
              <Form.Control type="text" value={rule.description} onChange={(e) => handleInputChangeRules(e, index)} />
              <InputGroup.Text style={{ height: "38px" }}>
                <Button variant="outline-secondary" style={{ fontSize: "10px" }} onClick={() => deleteRule(index)}>
                  &#10006;
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </div>
        ))}
 
        <div className="d-flex justify-content-end">
          <CButton color="primary" onClick={addRule}>Agregar Regla</CButton>
        </div>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <CButton color="primary" onClick={editTournament}>
          {showLoading && <CSpinner component="span" size="sm" aria-hidden="true" />}
          {showLoading ? "Guardando..." : "Guardar"}
        </CButton>
        <Button variant="secondary" onClick={toggle}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTournamentModal;
