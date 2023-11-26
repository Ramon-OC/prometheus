import api from '../api';
import moment from 'moment';
import DataTable from './DataTable';
import { FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DeleteTournamentModal from './DeleteTournamentModal';
import { Modal, Button, Container, Form } from 'react-bootstrap';
import { CAvatar, CBadge, CButton, CSpinner } from '@coreui/react';

const columns = [
  {
    key: 'avatar',
    label: '',
    filter: false,
    sorter: false,
    _style: { width: '1%' },
  },
  {
    key: 'name',
    label: 'Nombre',
    _style: { width: '30%' },
  },
  {
    key: 'created_at',
    label: "Fecha Registro",
    _style: { width: '20%' },
  },
  { 
    key: 'start_date',
    label: "Fecha de Inicio",
    _style: { width: '20%' }
  },
  { 
    key: 'end_date',
    label: "Fecha de Finalización",
    _style: { width: '20%' }
  },
  { 
    key: 'status',
    _style: { width: '10%' }
  },
  {
    key: 'actions',
    label: 'Acciones',
    _style: { width: '10%' },
    filter: false,
    sorter: false,
  },
];

const getBadge = (status) => {
  if (status === "Pendiente") return "primary";
  if (status === "En progreso") return "success";
  if (status === "Concluido") return "info";
  if (status === "Eliminado") return "danger";
}

const Tournaments = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setLoading] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [tournamentData, setTournamentData] = useState({
    name: '',
    start_date: '',
    end_date: '',
  });

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleShowDeleteModal = (tournament) => {
    setTournamentToDelete(tournament);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setTournamentToDelete(null);
    setShowDeleteModal(false);
    getTournaments();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTournamentData({ ...tournamentData, [name]: value });
  };

  const handleDelete = () => {
    console.log("Tournament", tournamentToDelete);
    handleCloseDeleteModal();
  }

  const getTournaments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tournament');
      console.log("Response", response);
      if (response.status === 200) {
        setTournaments(response.data);
      } else {
        console.error("Error al obtener torneos");
      }
      setLoading(false);
    } catch (error) {
      console.error('Error de red:;', error);
    }
  };

  useEffect(() => {
    getTournaments();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post('/tournament', tournamentData);
      toast.success(`Torneo ${response.data.name} agregado con éxito`);
      setShowModal(false);
      setTournamentData({
        name: '',
        start_date: '',
        end_date: '',
      });
      setLoading(false);
      getTournaments();
    } catch (error) {
      console.error("Error al agregar torneo:", error);
      toast.error('Error al agregar torneo');
    }
  };

  const scopedColumns = {
    avatar: (item) => (
      <td><CAvatar src={`/avatar.jpg`} size="large" alt="Avatar" shape="rounded"/></td>
    ),
    created_at: (item) => (
      <td>{ moment(item.created_at).format("YYYY-MM-DD HH:mm:ss") }</td>
    ),
    start_date: (item) => (
      <td>{ moment(item.start_date).format("YYYY-MM-DD HH:mm:ss") }</td>
    ),
    end_date: (item) => (
      <td>{ moment(item.end_date).format("YYYY-MM-DD HH:mm:ss") }</td>
    ),
    status: (item) => (
      <td>
        <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
      </td>
    ),
    actions: (item) => (
      <td>
        {!item.deleted_at && (<CButton color="danger" size="sm" onClick={() => handleShowDeleteModal(item)}>
          <FaTrash />
        </CButton>)}
      </td>
    ),
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <DataTable
        handleModalShow={handleModalShow}
        showLoading={showLoading}
        items={tournaments}
        columns={columns}
        scopedColumns={scopedColumns}
        title="Listado de Torneos"
      />

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Torneo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3 w-100" controlId="participant-name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name" value={tournamentData.name} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="participant-start">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control type="datetime-local" name="start_date" value={tournamentData.start_date} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="participant-end">
            <Form.Label>Fecha de finalización</Form.Label>
            <Form.Control type="datetime-local" name="end_date" value={tournamentData.end_date} onChange={handleInputChange} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <CButton color="primary" onClick={handleSubmit} disabled={showLoading}>
            {showLoading && <CSpinner component="span" size="sm" aria-hidden="true" />}
            {showLoading ? "Guardando..." : "Guardar"}
          </CButton>
          <Button variant="secondary" onClick={handleModalClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <DeleteTournamentModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        tournament={tournamentToDelete}/>
    </Container>
  );
};

export default Tournaments;
