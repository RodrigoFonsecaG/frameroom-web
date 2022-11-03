import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;


export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  button {
    margin-top: 4rem;
  }

  form .inputs-container .input-group {
    display: flex;
    align-items: center;
    gap: 1rem;

    > div {
      margin-bottom: 0.8rem;
    }

    > div + div {
      margin-top: 0;
      height: 57px;
    }

    @media (max-width: 850px) {
      display: block;
    }
  }
`;

export const Footer = styled.div`
  div.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;

    svg {
      color: var(--light-blue);
    }

    a {
      font-size: 2rem;
      font-weight: 600;
      color: var(--dark-blue);
    }
  }
`;
