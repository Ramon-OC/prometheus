import api from '../api';
import moment from 'moment';
import DataTable from './DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
    key: 'email',
    label: "Email",
    _style: { width: '20%' }
  },
  {
    key: 'created_at',
    label: "Fecha Registro",
    _style: { width: '20%' },
  },
  { 
    key: 'status',
    _style: { width: '10%' }
  },
  {
    key: 'show_details',
    label: 'Acciones',
    _style: { width: '10%' },
    filter: false,
    sorter: false,
  },
];

const scopedColumns = {
  avatar: (item) => (
    <td><CAvatar src={`/avatar.jpg`} size="large" alt="Avatar" shape="rounded"/></td>
  ),
  created_at: (item) => (
    <td>{ moment(item.created_at).format("YYYY-MM-DD HH:mm:ss") }</td>
  ),
  status: (item) => (
    <td>
      <CBadge color={getBadge(item.created_at)}>{item.created_at ? "Activo" : "Inactivo"}</CBadge>
    </td>
  ),
};

const getBadge = (status) => {
  return status ? 'success' : 'primary';
}

const Administrators = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
  });

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const getAdmins = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin');
      if (response.status === 200) {
        setAdmins(response.data);
      } else {
        console.error("Error al obtener administradores");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error de red:;', error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post('/admin', adminData);
      toast.success(`Administrador ${response.data.name} agregado con éxito`);
      setShowModal(false);
      setAdminData({
        name: '',
        email: '',
      });
      getAdmins();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error al agregar administrador:", error);
      toast.error('Error al agregar administrador');
    }
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <DataTable
        handleModalShow={handleModalShow}
        showLoading={showLoading}
        items={admins}
        columns={columns}
        scopedColumns={scopedColumns}
        title="Listado de Administradores"
      />

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3 w-100" controlId="admin-name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name" value={adminData.name} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="admin-email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={adminData.email} onChange={handleInputChange} />
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
    </Container>
  );
};

export default Administrators;
