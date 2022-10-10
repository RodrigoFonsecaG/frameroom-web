import styled, { css } from 'styled-components';

export const Container = styled.button`
  cursor: pointer;
  color: var(--white);
  background-color: var(--light-blue);
  width: 100%;
  border-radius: 8px;
  height: 5.6rem;
  font-family: 'Archivo', sans-serif;
  font-weight: 600;

  transition: background-color 0.2s;

  &:hover {
    background-color: var(--dark-blue);
  }
`;
