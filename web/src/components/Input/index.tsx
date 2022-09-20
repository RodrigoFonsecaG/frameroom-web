import React, { InputHTMLAttributes } from 'react';
import {Container} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    icon: React.ComponentType<{ size: number; }>
}

const Input: React.FC<InputProps> = ({icon: Icon, ...rest}) => {
    return <Container>
        <Icon size={20}/>
        <input {...rest}/>
  </Container>;
};

export default Input;
