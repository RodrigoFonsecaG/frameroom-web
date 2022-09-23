import styled from 'styled-components';

export const Content = styled.textarea`
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

