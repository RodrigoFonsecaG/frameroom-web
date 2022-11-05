import styled from 'styled-components';

export const Content = styled.div`
  .filters-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-bottom: 3.2rem;

    button {
      padding: 1.6rem;
    }
  }
  .filters {
    display: flex;

    gap: 2rem;

    button {
      width: 15rem;
    }
  }

  @media (max-width: 750px) {
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
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 650px) {
      grid-template-columns: 1fr;
    }

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
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      .room-title h2 {
        font-size: 2rem;
      }

      .room-title svg {
        color: var(--dark-blue);
      }

      .room-info {
        padding: 1.6rem;
        background-color: #fafafc;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        font-family: 'Archivo', sans-serif;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom: 3px solid var(--light-blue);

        .order-button {
          margin-left: auto;
        }

        button {
          font-size: 1.2rem;
          font-weight: 600;
          width: 8rem;
          height: 4rem;
          margin-top: 2rem;
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
    height: 17.5rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    object-fit: cover;
  }
`;
