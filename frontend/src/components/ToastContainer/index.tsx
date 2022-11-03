import React from 'react';
import { Container } from './styles';
import Toast from './Toast';

import { ToastMessage } from '../../context/ToastContext';
import { useTransition } from '@react-spring/web';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {


  const transitions = useTransition(messages, {
    keys: (message) => message.id,
    from: { right: '-120%'},
    enter: { right: '0%'},
    leave: { right: '-120%' },
  });



  return (
    <Container>
      {transitions(( style, item ) => (
        <Toast style={style} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
