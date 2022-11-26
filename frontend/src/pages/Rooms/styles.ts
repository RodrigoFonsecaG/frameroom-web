import styled from 'styled-components';

export const Content = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-bottom: 3.2rem;
    gap: 2rem;

    button {
      padding: 1.6rem;
    }
  }
  .filters {
    display: flex;
    align-items: flex-end;

    gap: 2rem;

    div > select {
      width: 15rem;
    }

    > button {
      width: 12rem;
    }
  }

  @media (max-width: 750px) {
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

    }
    .filters {
      flex-direction: column;
      align-items: initial;
      width: 100%;

      > div > div {
        width: 100%;
      }

      > button {
        margin: 0 auto;
      }
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-auto-rows: 1fr;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  img {
    width: 26rem;
    height: 17.5rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    object-fit: cover;
  }
`;
