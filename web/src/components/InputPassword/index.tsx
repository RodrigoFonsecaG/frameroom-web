import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputPassword: React.FC<InputProps> = ({ name, ...rest }) => {
  const [isActive, setIsActive] = React.useState(false);

  function handleShowPassword(event: any) {
    const inputPassword = event.currentTarget.previousElementSibling;
    if (isActive) {
      inputPassword.type = 'password';
    } else {
      inputPassword.type = 'text';
    }
    setIsActive(!isActive);
  }

  return (
    <Container active={isActive}>
      <FiLock size={20} />
      <input {...rest} />
      <div className='icon-container' onClick={handleShowPassword}>
        {!isActive ? <FiEye size={20} /> : <FiEyeOff size={20} />}
      </div>
    </Container>
  );
};

export default InputPassword;
