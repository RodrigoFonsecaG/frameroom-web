import styled, { css } from 'styled-components';
interface ContainerProps {
  isErrored: boolean;
}

export const Content = styled.textarea<ContainerProps>`
  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid #c53030 !important;
    `}

  &:focus-within {
    border: 1px solid #e6e6f0;
  }

  width: 100%;
  padding: 1.6rem;

  background: var(--white);
  color: var(--grey);
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  padding: 1.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  color: var(--dark-gray);
  height: 20rem;

  resize: none;

  &:focus {
    border: 1px solid var(--dark-blue);
  }
`;


