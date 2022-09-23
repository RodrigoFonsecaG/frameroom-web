import React from 'react';
import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Rooms from './pages/Rooms';
import Room from './pages/Room';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  </>
);


export default App
