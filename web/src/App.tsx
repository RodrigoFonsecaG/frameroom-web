import React from 'react';
import GlobalStyle from './styles/global';
import { BrowserRouter} from 'react-router-dom';


import Routes from './routes';

import { AuthProvider } from './context/AuthContext';


const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    <GlobalStyle />
  </BrowserRouter>
);


export default App
