import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AuthRouteProps{
  Component: React.ComponentType;
  needAuth: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ Component, needAdmin }) => {
  const { user } = useAuth();


  return needAdmin ? (
    <Component />
  ) : (
    <Navigate to={needAdmin ? '/' : '/rooms'} />
  );
};

export default AuthRoute;
