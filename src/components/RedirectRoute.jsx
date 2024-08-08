import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ element, ...rest }) => {
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  return isLoggedIn ? <Navigate to="/" /> : element;
};

export default RedirectRoute;
