import styled from 'styled-components';


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 50%;
  margin: 6.4rem 0;

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

    .input-group div:first-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .input-group div + div:not(:first-child):not(:last-child) {
      margin-top: -1px;
      border-radius: 0;
    }

    .input-group div:last-child {
      margin-top: -1px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;
