import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuth';
import { useDataContext } from '../../context/FetchDeleteData';

function ProtectedRoute({ children }) {
  const { admin } = useDataContext();
  const { user } = useUserAuth();

  if (!user && !admin) {
    // Redirect to the user dashboard if no user is logged in
    return <Navigate to="/student" />;
  }
  else if (!admin && !user) {
    // Redirect to the admin login page if no admin is logged in
    return <Navigate to="/admin" />;
  }

  return children;
}

export default ProtectedRoute;
