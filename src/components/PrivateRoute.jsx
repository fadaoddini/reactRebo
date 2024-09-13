import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const accessToken = sessionStorage.getItem('accessToken'); // تغییر به sessionStorage
  const isLoggedIn = Boolean(accessToken);

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
