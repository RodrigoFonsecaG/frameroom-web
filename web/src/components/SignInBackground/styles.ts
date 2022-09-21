import styled from 'styled-components';
import signInBackgroundImg from '../../assets/sign-background.png';

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 56rem;
    padding: 0 1.6rem;
  }

  @media (max-width: 800px) {
    display: none;
    visibility: none;
  }
`;
