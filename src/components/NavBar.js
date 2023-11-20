import './NavBar.css';
import React from 'react';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUser, FaUsers, FaUserShield, FaUserFriends } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavItem path="/administrators" icon={<FaUserShield />} label="Administradores" />
      <NavItem path="/participants" icon={<FaUserFriends />} label="Participantes" />
      <NavItem path="/profile" icon={<FaUser />} label="Información Personal" />
      <NavItem path="/friends" icon={<FaUsers />} label="Amigos" />
      <NavItem path="/tournaments" icon={<FaTrophy />} label="Torneos" />
    </nav>
  );
};

export default NavBar;

