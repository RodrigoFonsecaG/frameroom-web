import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 *{
    margin: 0;
    padding: 0;
    border: none;
    text-decoration: none;
    box-sizing: border-box;
    outline: 0;
 }

 html{
    --dark-blue: #32264D;
    --light-blue: #30477D;
    --dark-gray: #6A6180;
    --light-gray: #F0F0F7;
    --white: #FAFAFC;
    --gray: #9C98A6;

    font-size: 62.5% /* 1rem = 10px */
 }

 body{
    background-color: var(--light-gray);
    -webkit-font-smoothing: antialiased;
 }

 body, button, input, textarea{
    /*mínimo que a fonte pode chegar, padrão, maximo que a fonte pode chegar*/
    font-size: clamp(14px, 1.6rem, 2vw);
    font-family: 'Poppins', sans-serif;
}

h1,h2,h3, h4,h5{
    font-weight: 600;
    font-size: 3.2rem;
    color: var(--dark-blue);
}

button{
    cursor: pointer;
    color: var(--white);
    background-color: var(--light-blue);
    width: 100%;
    border-radius: 8px;
    height: 5.6rem;
    font-family: 'Archivo', sans-serif;
    font-weight: 600;

    transition: background-color 0.2s;

}

button:hover{
   background-color: var(--dark-blue);
}

a{
   color: var(--gray);
   font-size: 1.4rem;
}

`;