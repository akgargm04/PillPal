import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ requiredRole }) => {
  const { token, user } = useAuth();

  // If token is not available, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Wait for user to be populated
  if (!user) {
    return <div>Loading...</div>;
  }

  // If role is defined and doesn't match, redirect to home
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
