import styled, { css } from 'styled-components';



export const Container = styled.div`
  position: relative;

  span {
    width: 16rem;
    background: #c53030;
    padding: 0.8rem;
    border-radius: 4px;
    font-size: 1.4rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0.8rem;

    color: var(--white);

    &::before {
      content: '';
      border-style: solid;
      border-color: #c53030 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;


export const Error = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  margin-left: 1.6rem;

  svg {
    margin: 0 !important;
  }


`;
