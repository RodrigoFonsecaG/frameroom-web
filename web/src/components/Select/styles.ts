import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: var(--white);
  color: var(--grey);
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  padding: 1.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  width: 25rem;

  

  &:focus-within:before {
    content: '';
    width: 2px;
    height: 4.8rem;
    background-color: var(--light-blue);

    position: absolute;
    left: 0;

    border-radius: 8px;
  }

  

  select {
    flex: 1;
    border: 0;
    background: transparent;
    color: var(--dark-gray);
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    
   

    &::placeholder {
      color: var(--gray);
    }
  }
  svg {
    margin-right: 1.6rem;
    color: var(--gray);
  }

  .icon-container {
    display: flex;
    place-content: center;
  }

  div > svg {
    margin-left: 1rem;
  }
`;

