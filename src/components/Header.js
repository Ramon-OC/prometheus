import './Header.css';
import React, { useState } from 'react';
import { useAuth } from '../AuthProvider';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-container">
          <img src="/Prometheus.png" alt="Logo" />
        </div>
        <div className="user-container">
          <div className="user-avatar" onClick={toggleMenu}>
            <img src="/avatar.jpg" alt="Avatar" />
            {menuVisible && (
              <div className="user-menu">
                <div className="menu-item user-name">{user.name}</div>
                <div className="menu-item" onClick={logout}>
                  <FaSignOutAlt /> Cerrar Sesión
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

