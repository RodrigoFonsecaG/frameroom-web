import React, { InputHTMLAttributes } from 'react';
import {Container} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    iconSize?: number;
    icon: React.ComponentType<{ size: number; }>
}

const Input: React.FC<InputProps> = ({icon: Icon, iconSize, ...rest}) => {
    return <Container>
        <Icon size={iconSize ? iconSize : 20}/>
        <input {...rest}/>
  </Container>;
};

export default Input;
