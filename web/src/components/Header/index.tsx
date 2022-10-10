import React from 'react';
import { HeaderContainer, HeaderContent } from './styles';
import unimontesFrameroomLogo from '../../assets/unimontes-frameroom-logo.svg';
import { FiChevronDown, FiUser, FiMenu } from 'react-icons/fi';
import useMedia from '../../hooks/useMedia';

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



const Header = () => {

  const mobile = useMedia('(max-width: 60rem)');

  const { user, signOut } = useAuth();
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/">
          <img src={unimontesFrameroomLogo} alt="" />
        </Link>
        {mobile ? (
          <FiMenu size={30} color={'#FAFAFC'} />
        ) : (
          <>
            <nav>
              <a href="" className="active">
                Início
              </a>
              <div className="link-down">
                <a href="">Espaços</a>
                <FiChevronDown />
              </div>
              <div className="link-down">
                <a href="">Reserva</a>
                <FiChevronDown />
              </div>
              <div className="link-down">
                <a href="">Horários</a>
                <FiChevronDown />
              </div>
              <a href="" onClick={signOut}>
                Logout
              </a>
            </nav>

            <div className="profile-navbar">
              <div className="user-info">
                <span>{user.name}</span>
                <p>{user.email}</p>
              </div>

              <div className="user-photo">
                <FiUser size={20} />
              </div>
            </div>
          </>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
