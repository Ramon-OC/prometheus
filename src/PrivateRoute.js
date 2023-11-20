import React from 'react';
import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  console.log("User", user);

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
