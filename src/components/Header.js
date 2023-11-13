import './Header.css';
import React from 'react';
import { useAuth } from '../AuthProvider';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="logo-container">
        <img src="/Prometheus.png" alt="Logo" />
      </div>
    </header>
  );
};

export default Header;

