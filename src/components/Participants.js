import api from '../api';
import moment from 'moment';
import DataTable from './DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { CAvatar, CBadge } from '@coreui/react';

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

const Participants = () => {
  const [showLoading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);

  const getParticipants = async () => {
    try {
      setLoading(true);
      const response = await api.get('/participant');
      if (response.status === 200) {
        setParticipants(response.data);
      } else {
        console.error("Error al obtener participantes");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error de red:;', error);
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);
  
  return (
    <Container className="mt-5">
      <ToastContainer />
      <DataTable
        showLoading={showLoading}
        items={participants}
        columns={columns}
        scopedColumns={scopedColumns}
        title="Listado de Participantes"
      />
    </Container>
  );
};

export default Participants;
