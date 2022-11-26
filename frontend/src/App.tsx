import React from 'react';
import GlobalStyle from './styles/global';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import ToastContainer from './components/ToastContainer';
import AppProvider from './context';




const App: React.FC = () => (
  <BrowserRouter>

      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />

  </BrowserRouter>
);

export default App;
