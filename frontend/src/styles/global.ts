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

 html,
body,
#root {
  height: 100vh;

}

 body{
    background-color: var(--light-gray);
    -webkit-font-smoothing: antialiased;
 }


 img{
   display: block;
 }
 
 body, button, input, textarea, select, label{
    /*mínimo que a fonte pode chegar, padrão, maximo que a fonte pode chegar*/
    font-size: clamp(14px, 1.6rem, 2vw);
    font-family: 'Poppins', sans-serif;
    
}

label{
   color: var(--dark-blue);
   font-size: 1.4rem;

}

h1,h2,h3, h4,h5{
    font-weight: 600;
    font-size: 3.2rem;
    color: var(--dark-blue);
}



a{
   color: var(--gray);
   font-size: 1.4rem;
   cursor: pointer;
}

p{
   color: var(--gray);
}

.container{
    width: 90%;
    max-width: 1300px;
    margin: 0 auto;
    margin-top: 4rem; 
}

 .top-text {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    font-size: 1.4rem;

    .error {
      color: #c53030;
    }
  }



`;
