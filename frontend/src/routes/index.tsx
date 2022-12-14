import React from 'react';
import { Route, Routes as Switch} from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Rooms from '../pages/Rooms';
import Room from '../pages/Room';

import AuthRoute from './AuthRoute'
import CreateRoom from '../pages/CreateRoom';
import EditRoom from '../pages/EditRoom';
import Schedules from '../pages/Schedules'
import CreateOrder from '../pages/CreateOrder';
import Orders from '../pages/Orders';
import Order from '../pages/Order';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import RoomsMap from '../pages/RoomsMap';

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
      <Route
        path="forgot-password"
        element={<AuthRoute Component={ForgotPassword} needAuth={false} />}
      />
      <Route
        path="reset-password"
        element={<AuthRoute Component={ResetPassword} needAuth={false} />}
      />
      <Route path="rooms" element={<Rooms />} />
      <Route path="rooms/map" element={<RoomsMap />} />
      <Route
        path="rooms/:room_code"
        element={<AuthRoute Component={Room} needAuth />}
      />
      <Route
        path="rooms/:room_code/edit"
        element={<AuthRoute Component={EditRoom} needAuth needAdmin />}
      />
      <Route
        path="schedules/:room_code"
        element={<AuthRoute Component={Schedules} needAuth needAdmin />}
      />
      <Route
        path="create-room"
        element={<AuthRoute Component={CreateRoom} needAuth needAdmin />}
      />
      <Route
        path="create-order"
        element={<AuthRoute Component={CreateOrder} needAuth />}
      />
      <Route
        path="orders"
        element={<AuthRoute Component={Orders} needAuth needAdmin />}
      />
      <Route
        path="orders/:order_code"
        element={<AuthRoute Component={Order} needAuth needAdmin />}
      />
    </Switch>
  );
};

export default Routes;
