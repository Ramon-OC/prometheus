import './App.css';
import React from 'react';
import Main from './components/Main';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Main />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  return <h1>Página de inicio</h1>;
}

export default App;
