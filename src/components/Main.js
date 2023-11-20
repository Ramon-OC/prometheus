import './Main.css';
import React from 'react';
import Home from './Home';
import Header from './Header';
import NavBar from './NavBar';
import Profile from './Profile';
import PrivateRoute from '../PrivateRoute';
import Administrators from './Administrators';
import { AuthProvider, useAuth } from '../AuthProvider';
import { Routes, Route, Navigate } from 'react-router-dom';

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/administrators" element={<Administrators />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppComponent;

