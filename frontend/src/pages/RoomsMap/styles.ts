import styled from 'styled-components';

export const Content = styled.div`
  > h2 {
    margin-bottom: 2rem;
    font-size: 3rem;
  }
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
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

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
        flex-direction: column;
        font-family: 'Archivo', sans-serif;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;

        &#available {
          border-bottom: 10px solid #228636;
        }

        &#unavailable {
          border-bottom: 10px solid #ba2621;
        }

        .dates {
          display: flex;
          flex-direction: column;
          align-items: flex-start !important;

          .intervals {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
        }

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

        .info p {
          color: var(--light-blue);
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
