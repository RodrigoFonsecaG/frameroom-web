import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { Container } from './styles';
import { FiChevronDown } from 'react-icons/fi';
import { useField } from '@unform/core';
import ErrorToolTip from '../ErrorTooltip';

interface optionsKeys {
  text: string;
  value?: number | string;
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  iconSize?: number;
  placeholder?: string;
  icon: React.ComponentType<{ size: number }>;
}

const Select: React.FC<InputProps> = ({
  icon: Icon,
  name,
  iconSize,
  placeholder,
  children,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  console.log(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <label htmlFor="">{placeholder}</label>
      <Container isErrored={!!error}>
        <Icon size={iconSize ? iconSize : 20} />
        <select ref={inputRef} defaultValue={defaultValue} {...rest}>
          {children}
        </select>
        <div className="icon-container">
          <FiChevronDown size={20} />
        </div>

        {error && <ErrorToolTip title={error} />}
      </Container>
    </div>
  );
};

export default Select;
