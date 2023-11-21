import './Main.css';
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import Profile from './Profile';
import Tournaments from './Tournaments';
import { useAuth } from '../AuthProvider';
import Participants from './Participants';
import Administrators from './Administrators';
import { Routes, Route, Navigate } from 'react-router-dom';

const MainComponent = () => {
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/administrators" element={<Administrators />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainComponent;

