import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState
} from 'react';
import { useField } from '@unform/core';
interface Props {
  name: string;
}

import {Container} from './styles';
import { FiUpload } from 'react-icons/fi';
type InputProps = JSX.IntrinsicElements['input'] & Props;
export default function ImageInput({ name, ...rest }: InputProps) {

  const [filename, setFilename] = useState("")

  function handleFilename(event) {
    setFilename(event.target.files[0].name);
  }


  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);
  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      }
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <label>Imagem *</label>

      <div>
        <div>
          <input
            id="file"
            type="file"
            ref={inputRef}
            onChange={() => handleFilename(event)}
            {...rest}
          />
          <FiUpload />

          <span>{filename ? filename : 'Selecione uma imagem'}</span>
        </div>
        <label htmlFor="file">Procurar</label>
      </div>
    </Container>
  );
}
