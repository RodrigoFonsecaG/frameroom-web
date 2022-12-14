import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}


export const Container = styled.div<ContainerProps>`
  background: var(--white);
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  padding: 0 1.6rem;
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

  &:focus-within > svg {
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

  select,
  select:disabled {
    flex: 1;
    border: 0;
    background: transparent;
    color: var(--dark-blue);
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    opacity: 1;

    padding: 1.6rem 0;
  }
  > svg {
    margin-right: 1.6rem;
    color: var(--gray);
  }


  .icon-container {
    display: flex;
    place-content: flex-end;
    color: var(--gray);
  }
`;


