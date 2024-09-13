import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ element, redirectTo, requiresAuth }) => {
  const accessToken = sessionStorage.getItem('accessToken'); // تغییر به sessionStorage
  const isLoggedIn = Boolean(accessToken);

  if (requiresAuth && !isLoggedIn) {
    return <Navigate to="/login" />; // اگر نیاز به احراز هویت باشد و کاربر وارد نشده باشد، به صفحه لاگین هدایت می‌شود
  }

  if (!requiresAuth && isLoggedIn) {
    return <Navigate to={redirectTo} />; // اگر نیاز به احراز هویت نباشد و کاربر وارد شده باشد، به صفحه مورد نظر هدایت می‌شود
  }

  return element;
};

export default RedirectRoute;
