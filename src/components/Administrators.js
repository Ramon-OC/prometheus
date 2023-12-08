import api from '../api';
import moment from 'moment';
import DataTable from './DataTable';
import { FaTrash, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import DeleteAdminModal from './DeleteAdminModal';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap';
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
    key: 'full_name',
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
    key: 'deleted_at',
    label: "Estatus",
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
  return status ? 'danger' : 'success';
}

const Administrators = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setLoading] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminData, setAdminData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    surname: '',
    email: '',
    role: 'Administrador',
  });

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleShowDeleteModal = (admin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setAdminToDelete(null);
    setShowDeleteModal(false);
    getAdmins();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleDelete = () => {
    console.log("Admin", adminToDelete);
    handleCloseDeleteModal();
  }

  const getAdmins = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin');
      if (response.status === 200) {
        console.log("Users", response.data);
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
      toast.success(`Administrador ${response.data.full_name} agregado con éxito`);
      setShowModal(false);
      setAdminData({
        username: '',
        firstname: '',
        lastname: '',
        surname: '',
        email: '',
        role: 'Administrador',
      });
      getAdmins();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error al agregar administrador:", error);
      toast.error('Error al agregar administrador');
    }
  };

  const scopedColumns = {
    avatar: (item) => (
      <td><CAvatar src={item.avatar || "avatar.jpg"} size="large" alt="Avatar" shape="rounded" /></td>
    ),
    created_at: (item) => (
      <td>{ moment(item.created_at).format("YYYY-MM-DD HH:mm:ss") }</td>
    ),
    deleted_at: (item) => (
      <td>
        <CBadge color={getBadge(item.deleted_at)}>{item.deleted_at ? "Eliminado" : "Activo"}</CBadge>
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
            <Form.Group className="mb-3 w-100" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={adminData.username} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="firstname">
              <Form.Label>Nombre(s)</Form.Label>
              <Form.Control type="text" name="firstname" value={adminData.firstname} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="lastname">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control type="text" name="lastname" value={adminData.lastname} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="surname">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control type="text" name="surname" value={adminData.surname} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={adminData.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="role">
              <Form.Label>Rol</Form.Label>
                <Form.Control as="select" name="role" value={adminData.role} onChange={handleInputChange}>
                  <option value="admin">Administrador</option>
                  <option value="superadmin">Super Administrador</option>
                </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Row className="justify-content-end">
            <Col md={6}>
              <Button variant="primary" onClick={handleSubmit} disabled={showLoading} className="w-100">
                {showLoading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                {showLoading ? "Guardando..." : "Guardar"}
              </Button>
            </Col>
            <Col md={6}>
              <Button variant="secondary" onClick={handleModalClose} className="w-100">Cerrar</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      <DeleteAdminModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        admin={adminToDelete}/>
    </Container>
  );
};

export default Administrators;
