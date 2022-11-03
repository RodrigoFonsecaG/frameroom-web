import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { Container } from './styles';
import { useField } from '@unform/core';
import Error from '../ErrorTooltip';
import InputMask from 'react-input-mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  iconSize?: number;
  icon?: React.ComponentType<IconBaseProps>;
  topText?: string;
  mask?: string;
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  name,
  iconSize,
  mask,
  topText,
  ...rest
}) => {
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
    <>
      {topText ? (
        <div>
          <label htmlFor="">{topText}</label>
          <Container isErrored={!!error}>
            {Icon && <Icon size={iconSize ? iconSize : 20} />}

            {mask ? (
              <InputMask
                style={{ fontFamily: 'Archivo' }}
                ref={inputRef}
                mask={mask}
                {...rest}
              />
            ) : (
              <input ref={inputRef} {...rest} />
            )}

            {error}
          </Container>
        </div>
      ) : (
        <Container isErrored={!!error}>
          {Icon && <Icon size={iconSize ? iconSize : 20} />}
          {mask ? (
            <InputMask
              style={{ fontFamily: 'Archivo' }}
              ref={inputRef}
              mask={mask}
              {...rest}
            />
          ) : (
            <input ref={inputRef} {...rest} />
          )}

          {error && <Error title={error} />}
        </Container>
      )}
    </>
  );
};

export default Input;
