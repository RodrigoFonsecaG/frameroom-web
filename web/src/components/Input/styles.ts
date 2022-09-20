import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: var(--white);
  color: var(--grey);
  border: 1px solid #e6e6f0;
  border-radius: 10px;
  padding: 1.6rem;
  width: 100%;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: var(--dark-gray);
    &::placeholder {
      color: var(--gray);
    }
  }
  svg {
    margin-right: 1.6rem;
    color: var(--gray);
  }

`;
