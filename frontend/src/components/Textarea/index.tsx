import React from 'react'
import { Content } from './styles'

import  {useEffect, useRef } from 'react';
import { useField } from '@unform/core';

const Textarea = ({ text, name, ...rest }) => {

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
      <label htmlFor="">{text}</label>
      <Content ref={inputRef} {...rest}></Content>
    </>
  );
}

export default Textarea