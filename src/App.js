import './App.css';
import React from 'react';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/*" element={<Main />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
