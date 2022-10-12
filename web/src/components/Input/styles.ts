import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--white);
  color: var(--grey);
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  padding: 1.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid #c53030;
    `}

  &:focus-within {
    border: 1px solid #e6e6f0;
  }


  &:focus-within svg {
    color: var(--light-blue);
  }

  &:focus-within:before {
    content: '';
    width: 2px;
    height: 4.8rem;
    background-color: var(--light-blue);

    position: absolute;
    left: 0;

    border-radius: 8px;
  }

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    width: 100%;
    color: var(--dark-gray);
    &::placeholder {
      color: var(--gray);
    }
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  svg {
    margin-right: 1.6rem;
    color: var(--gray);
  }
`;
