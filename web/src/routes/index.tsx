import React from 'react';
import { Route, Routes as Switch} from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Rooms from '../pages/Rooms';
import Room from '../pages/Room';

import AuthRoute from './AuthRoute'
import CreateRoom from '../pages/CreateRoom';

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
      <Route path="rooms/:room_code" element={<AuthRoute Component={Room} needAuth />} />
      <Route path="create-room" element={<AuthRoute Component={CreateRoom} needAuth />} />
    </Switch>
  );
};

export default Routes;
