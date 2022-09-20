import styled from 'styled-components';
import signInBackgroundImg from '../../assets/sign-background.png';
import {FiCheck } from 'react-icons/fi';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

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

  div.create-account {
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
    .input-group div + div {
      margin-top: -1px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    .login-commands {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2.4rem 0 4rem 0;
    }

    .login-commands div {
      display: flex;
      justify-content: space-between;
      margin-top: 0.4rem;

      input {
        display: none;
      }

      label {
        margin-right: 4rem;
        font-size: 1.4rem;
        color: var(--gray);
        cursor: pointer;
      }

      input + label::before {
        content: '';
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background-color: var(--white);
        border: 1px solid var(--light-blue);
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
        margin-bottom: 3px;
      }

      input:checked + label::before {
        background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 10 10'%3E%3Cg class='nc-icon-wrapper' stroke-width='1' fill='%23555555'%3E%3Cpath fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' data-cap='butt' d='M2.83 4.72l1.58 1.58 2.83-2.83'/%3E%3C/g%3E%3C/svg%3E");
        background-color: var(--light-blue);
        background-position: center;
        border: none;
        padding: 1px;
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 56rem;
    padding: 0 1.6rem;
  }

  @media (max-width: 800px) {
    display: none;
    visibility: none;
  }
`;
