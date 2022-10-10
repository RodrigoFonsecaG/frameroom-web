import React from 'react';
import { Route, Routes as Switch} from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Rooms from '../pages/Rooms';
import Room from '../pages/Room';

import AuthRoute from './AuthRoute'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        path="/"
        element={<AuthRoute Component={SignIn} needAuth={false} />}
      />
      <Route
        path="sign-up"
        element={<AuthRoute Component={SignUp} needAuth={false} />}
      />
      <Route path="rooms" element={<Rooms />} />
      <Route path="room" element={<AuthRoute Component={Room} needAuth />} />
    </Switch>
  );
};

export default Routes;
