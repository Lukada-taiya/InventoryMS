import { Navigate, Outlet } from 'react-router-dom'; 

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = !!sessionStorage.getItem('email'); // Check if the user is authenticated  
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={{ pathname: '/' }} />
    );
};

export default PrivateRoute;
