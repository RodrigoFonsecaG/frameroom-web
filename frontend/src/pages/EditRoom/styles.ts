import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 8px;

  form > button {
    margin-top: 4rem;
  }

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

    .room-inputs {
      display: flex;
      gap: 2.4rem;
      width: 100%;
      flex-wrap: wrap;
      margin-bottom: 3rem;


      > div {
        flex: 1;
      }

      > div > div {
        background-color: var(--white);
        width: 100%;
      }
    }

  }
`;


export const Divider = styled.div`
border: 1px solid var(--light-gray);
margin: 2rem 0;
`