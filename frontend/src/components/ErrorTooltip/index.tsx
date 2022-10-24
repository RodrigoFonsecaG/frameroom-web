import React from 'react'
import { FiAlertCircle } from 'react-icons/fi';
import { Error, Container } from './styles'

interface TooltipProps{
    title: string
}

const ErrorToolTip: React.FC<TooltipProps> = ({title}) => {
    return (
      <Container>
        <Error>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
        <span>{title}</span>
      </Container>
    );
}

export default ErrorToolTip