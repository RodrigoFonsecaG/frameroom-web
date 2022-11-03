import React from 'react';
import { Content} from './styles';

import { useEffect, useRef } from 'react';
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
      <p className="top-text">
        <label htmlFor={name}>{text}</label>
        {error && <div className="error">{`(${error})`}</div>}
      </p>
      <Content isErrored={!!error} ref={inputRef} {...rest}></Content>
    </>
  );
};

export default Textarea;
