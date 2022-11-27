import React, {ButtonHTMLAttributes} from 'react'
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({text, loading, ...rest}) => {
  return <Container {...rest}>
    {loading ? 'Carregando...' : text}
  </Container>;
}

export default Button