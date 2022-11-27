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
  padding: 0 1rem 0 1rem;

  transition: background-color 0.2s;

  &.delete {
    background-color: #c53030;
  }

  &.approve {
    background-color:#419b45;
  }

  &.alt {
    background-color: var(--white);
    color: var(--light-blue);
    border: 2px solid var(--light-blue);
    width: 12rem;

    &:hover {
      background-color: var(--light-blue);
      color: var(--white);
      border: 2px solid var(--light-blue);
    }
  }

  &:hover {
    background-color: var(--dark-blue);
  }
`;
