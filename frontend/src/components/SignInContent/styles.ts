import styled, {keyframes} from 'styled-components';

const appearFromLeft = keyframes`
from{
opacity: 0;
transform: translateX(-50px);
}
to{
opacity: 1;
transform: translateX(0);
}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 50%;
  margin: 6.4rem 0;

  animation: ${appearFromLeft} 1s;
  

  @media (max-width: 800px) {
    max-width: 100%;
  }

  img {
    width: 12rem;
  }

  form {
    text-align: center;
    width: 100%;
    max-width: 560px;
    padding: 2.4rem;

    h1 {
      margin-bottom: 2.4rem;
    }

  }
`;
