import api from '../api';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { CCard, CCardBody, CCardHeader, CdataTable, CAvatar, CBadge } from '@coreui/react';
import { CSmartTable } from '@coreui/react-pro'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment';
import DataTable from './DataTable';

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
      console.error('Error de red:;', error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/admin', adminData);
      toast.success('Administrador agregado con éxito');
      setShowModal(false);
      setAdminData({
        name: '',
        email: '',
      });
      getAdmins();
    } catch (error) {
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
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input type="text" name="name" value={adminData.name} onChange={handleInputChange} />
          
          <label>Email:</label>
          <input type="email" name="email" value={adminData.email} onChange={handleInputChange} />
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
          <Button variant="secondary" onClick={handleModalClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Administrators;
