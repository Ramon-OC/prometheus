import './Main.css';
import React from 'react';
import Home from './Home';
import Header from './Header';
import NavBar from './NavBar';
import Profile from './Profile';
import { useAuth } from '../AuthProvider';
import Participants from './Participants';
import Administrators from './Administrators';
import { Routes, Route, Navigate } from 'react-router-dom';

const AppComponent = () => {
  const { user } = useAuth();

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
          <Route path="/participants" element={<Participants />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppComponent;

