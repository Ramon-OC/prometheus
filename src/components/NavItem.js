import './NavItem.css';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import { IconContext } from 'react-icons';

const NavItem = ({ path, icon, label }) => {
  const match = useMatch(path);
  return (
    <Link to={path} className={`nav-item ${match ? 'active' : ''}`}>
      <IconContext.Provider value={{ size: '2em' }}>
        {icon}
      </IconContext.Provider>
      <div className="nav-label">{label}</div>
    </Link>
  );
};

export default NavItem;

