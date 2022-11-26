import React from 'react'
import { Content } from './styles';
import logoFrameroomAlt from '../../assets/logo-frameroom-alt.png';


interface SignInContentProps {
  children: React.ReactNode;
}

const SignInContent: React.FC<SignInContentProps> = ({ children }) => {
  return (
    <Content>
      <img src={logoFrameroomAlt} alt="Frameroom" />

      {children}
    </Content>
  );
};

export default SignInContent;