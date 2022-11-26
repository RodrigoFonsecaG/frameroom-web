import React from 'react';
import logoUnimontes from '../../assets/unimontes-white-logo.png';
import { Background } from './styles';

const SignInBackground = () => {
  return (
    <Background>
      <img src={logoUnimontes} alt="Unimontes" />
      <h1>PRÉDIO 3 - CCET</h1>
    </Background>
  );
}

export default SignInBackground;