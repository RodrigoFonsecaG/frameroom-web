import styled from 'styled-components';

export const Content = styled.div`
  .filters {
    display: flex;

    gap: 2rem;


    margin-top: 4rem;

  
  }

  @media (max-width: 560px) {
    .filters {
      flex-direction: column;
      width: 100%;

        > div > div{
            width: 100%;
        }
    }
  }
`;


