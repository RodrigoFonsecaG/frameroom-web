import React from 'react';

// Recebe a media query / Ex: max-width: 40rem
const useMedia = (media: string) => {
  //Estado que vai receber o true or false do window.matchesMedia
  const [match, setMatch] = React.useState(false);

  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }

    //Ativar a primeira vez que entrarmos na pagina
    changeMatch();

    // Todo fez que acontece o resize a função é executada
    window.addEventListener('resize', changeMatch);

    //Caso esse elemento saia da tela, o evento é limpo
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);

  return match;
};

export default useMedia;
