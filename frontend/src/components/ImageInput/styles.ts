import styled, { css, keyframes } from 'styled-components';
interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  label {
    margin: 0;
  }

  > div {
    height: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1.6rem;

    width: 100%;
    border: 1px solid #e6e6f0;
    border-radius: 8px;

    ${(props) =>
      props.isErrored &&
      css`
        border: 2px solid #c53030 !important;
      `}

    > div {
      display: flex;
      align-items: center;
      gap: 1.6rem;

      span {
        color: var(--dark-gray);
      }

      svg {
        color: var(--dark-gray);
      }
    }

    > label {
      background-color: var(--light-blue);
      color: var(--white) !important;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      max-width: 15rem;
      text-align: center;
      margin-left: 1rem;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  input[type='file'] {
    display: none;
    height: 5.5rem;
  }
`;
