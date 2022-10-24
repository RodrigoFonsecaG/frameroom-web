import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AuthRouteProps{
  Component: React.ComponentType;
  needAuth: boolean;
  needAdmin?: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ Component, needAuth, needAdmin }) => {
  const { user } = useAuth();
  


  if (needAdmin && user) {
    return user.isAdmin ? <Component /> :  <Navigate to='/rooms'/>
  }
  else {
      return !!user === needAuth ? (
        <Component />
      ) : (
        <Navigate to={needAuth ? '/' : '/rooms'} />
      );
  }



};

export default AuthRoute;
