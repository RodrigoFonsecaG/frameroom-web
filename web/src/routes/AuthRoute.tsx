import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AuthRouteProps{
  Component: React.ComponentType;
  needAuth: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ Component, needAuth }) => {
  const { user } = useAuth();


  return !!user === needAuth ? (
    <Component />
  ) : (
    <Navigate to={needAuth ? '/' : '/rooms'} />
  );
};

export default AuthRoute;
