import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthStore';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return (
    <>{!user ? <Navigate to="/login" replace={true} /> : children}</>
  )
}

export default PrivateRoute