import React, {ButtonHTMLAttributes} from 'react'
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const Button: React.FC<ButtonProps> = ({text, ...rest}) => {
  return <Container {...rest}>{text}</Container>;
}

export default Button