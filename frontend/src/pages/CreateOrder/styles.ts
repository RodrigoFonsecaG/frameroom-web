import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 8px;

  section {
    padding: 4rem 7%;
    background-color: #fff;
    border-radius: 8px;

    form {
      display: flex;
      flex-direction: column;
    }

    form > button {
      margin: 4rem auto 0 auto;
    }
  }

  div.room-image img {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    max-height: 30rem;
    object-fit: cover;
    display: block;
  }

  div.room-infos {
    font-family: 'Archivo', sans-serif;

    .content {
      margin-top: 4rem;
      h3 {
        font-size: 2.4rem;
        margin-top: 3rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        font-weight: 600;

        p {
          font-size: 1.2rem;
        }
      }

      .date-hour {
        display: flex;
        align-items: baseline;
        gap: 2rem;
      }
    }

    .room-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      h2 {
        flex: 1.5;
        font-weight: 600;
        font-size: 3.2rem;
        color: var(--dark-blue);
        text-align: center;
        margin-bottom: 3.6rem;
      }


      @media (max-width: 400px) {
        h2 {
          font-size: 2.4rem;
        }

        button {
          font-size: 1.2rem;
        }
      }
    }

    .room-inputs {
      display: flex;
      gap: 2.4rem;
      width: 100%;

      margin-bottom: 3rem;
      align-items: center;

      > div {
        flex: 1;
        max-width: 500px;
      }

      > div > div {
        background-color: var(--white);
        width: 100%;
      }

      svg {
        color: var(--dark-blue);
      }
    }

    .date-inputs > div:first-child {
      flex: 2;
    }

    .date-inputs > div:nth-child(2) {
      flex: 1;
    }

    .date-inputs > div:nth-child(3) {
      flex: 1;
    }

    @media (max-width: 1000px) {
      .date-inputs {
        display: grid;
        width: 100%;
      }

      .date-inputs > div:first-child {
        flex: 1;
      }
    }
  }
`;

export const Divider = styled.div`
  border: 1px solid var(--light-gray);
  margin: 2rem 0;
`;
