import React from 'react'
import { Content } from './styles';
import logoFrameroom from '../../assets/logo-frameroom.png';

interface SignInContentProps {
  children: React.ReactNode;
}

const SignInContent: React.FC<SignInContentProps> = ({ children }) => {
  return (
    <Content>
      <img src={logoFrameroom} alt="Frameroom" />

      {children}
    </Content>
  );
};

export default SignInContent;