import styled, { css } from 'styled-components';


export const HeaderContainer = styled.header`
  width: 100%;
  background-color: var(--light-blue);
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const HeaderContent = styled.div`
  width: 90vw;
  max-width: 1300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 1rem 0;
  font-family: 'Archivo', sans-serif;

  nav {
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3.2rem;

    .link-down {
      display: flex;
      place-content: center;
      cursor: pointer;

      svg {
        color: var(--white);
        margin-top: 1px;
        margin-left: 8px;
      }
    }

    .link-down:hover {
      font-weight: bold;

      a {
        opacity: 100%;
      }
    }
  }

  nav a {
    color: var(--white);
    opacity: 80%;
    font-size: 1.6rem;
    position: relative;
  }

  nav a.active,
  nav a:hover {
    font-weight: bold;
    opacity: 100%;
  }

  nav a::after {
    content: '';
    width: 0%;
    height: 2px;
    background: var(--white);

    position: absolute;
    left: 0;
    bottom: -3rem;

    transition: width 0.2s;
  }

  nav a.active::after {
    width: 100%;
  }

  .profile-navbar {
    display: flex;
    justify-content: center;
    gap: 1.6rem;

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;

      span {
        color: var(--white);
      }
    }

    .user-photo {
      background-color: var(--light-gray);
      width: 4.8rem;
      height: 4.8rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: var(--light-blue);
      }
    }
  }
`;
