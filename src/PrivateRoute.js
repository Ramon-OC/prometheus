// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  console.log("User", user);

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
