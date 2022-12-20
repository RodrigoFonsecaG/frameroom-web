import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .table-container {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex: 1;

    .loading {
      text-align: center;
      font-size: 2rem;
      color: var(--light-blue);
      font-weight: bold;
    }

    .week-choose {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.6rem;
      margin: 2rem 0;

      span {
        font-size: 2.4rem;
        font-weight: bold;
        font-family: 'Archivo', sans-serif;
        color: var(--light-blue);
      }

      svg {
        cursor: pointer;
        color: var(--white);
        background-color: var(--light-blue);
        border-radius: 4px;
      }
    }

    .error {
      color: #c53030;
      font-size: 1.6rem;
      text-align: center;
    }

    .table {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .schedule-time {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .schedule-title {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
      }

      .disponibility {
        display: flex;
        gap: 1.6rem;

        p {
          color: black;
          font-weight: bold;
        }

        p::before {
          content: '';
          display: inline-block;
          width: 36px;
          height: 16px;
          background-color: red;
          border: 1px solid var(--dark-blue);
          vertical-align: middle;
          margin-right: 0.4rem;
        }

        .available::before {
          background-color: #b6f8c4;
        }

        .unavailable::before {
          background-color: #ffb7b7;
        }
      }

      h2 {
        font-weight: 600;
        font-size: 2.4rem;
        font-family: 'Archivo', sans-serif;
      }
    }
  }

  button {
    max-width: 24rem;
    align-self: flex-end;
    position: absolute;
    margin-left: auto;
    left: 0;
    right: 0;
    top: -20px;
    text-align: center;
  }

  @media (max-width: 660px) {
    button {
      max-width: 25rem;
      align-self: center;
      position: initial;
      margin: 0 auto;
    }
  }
`;

