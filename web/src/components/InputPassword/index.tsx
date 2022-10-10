import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { Container } from './styles';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useField } from '@unform/core';

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

    const inputRef = useRef(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <Container active={isActive}>
      <FiLock size={20} />
      <input ref={inputRef} {...rest} />
      <div className="icon-container" onClick={handleShowPassword}>
        {!isActive ? <FiEye size={20} /> : <FiEyeOff size={20} />}
      </div>

      {error}
    </Container>
  );
};

export default InputPassword;
