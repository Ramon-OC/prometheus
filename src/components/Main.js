import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../AuthProvider';
import PrivateRoute from '../PrivateRoute';
import Header from './Header';
import NavBar from './NavBar';
import Home from './Home';
import './Main.css';

const AppComponent = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppComponent;

