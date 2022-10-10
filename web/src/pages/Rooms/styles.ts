import styled from 'styled-components';

export const Content = styled.div`
  .filters {
    display: flex;

    gap: 2rem;

    margin-bottom: 3.2rem;

    div > select {
      width: 15rem;
    }
  }

  @media (max-width: 560px) {
    .filters {
      flex-direction: column;
      width: 100%;

      > div > div {
        width: 100%;
      }
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;

    .card {
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 8px;

      .room-title {
        padding: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        border-bottom: 1px solid #e6e6f0;
      }

      .room-title h2 {
        font-size: 2rem;
      }

      .room-title a {
        background-color: var(--light-gray);
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .room-title svg {
        color: var(--dark-blue);
      }

      .room-info {
        padding: 1.6rem;
        background-color: #fafafc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'Archivo', sans-serif;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom: 3px solid var(--light-blue);

        button {
          font-size: 1.2rem;
          font-weight: 600;
          width: 8rem;
          height: 4rem;
        }

        .info div {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          span {
            font-weight: 600;
            font-size: 1.6rem;
            color: var(--dark-blue);
            line-height: 26px;
          }
        }
      }
    }
  }

  img {
    width: 26rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
  }
`;


