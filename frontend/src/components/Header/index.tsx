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
                <Link to="/rooms">Espaços</Link>
                <FiChevronDown />
              </div>
              <div className="link-down">
                <Link to="/create-order">Reservas</Link>
                <FiChevronDown />
              </div>
              <div className="link-down">
                <Link to="/">Horários</Link>
                <FiChevronDown />
              </div>
              <a href="" onClick={signOut}>
                Logout
              </a>
            </nav>

            <div className="profile-navbar">
              <div className="user-info">
                <span>{user && user.name}</span>
                <p>{user && user.email}</p>
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
