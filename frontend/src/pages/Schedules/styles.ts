import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 8px;

  section {
    padding: 4rem 7%;
    background-color: #fff;
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
    position: relative;

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

    .room-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      h2 {
        flex: 1.5;
      }

      button {
        flex: 1;
        max-width: 24rem;
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
  }
`;

export const Divider = styled.div`
  border: 1px solid var(--light-gray);
  margin: 2rem 0;
`;
