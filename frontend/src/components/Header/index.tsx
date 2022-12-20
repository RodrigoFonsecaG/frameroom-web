import React from 'react';
import { HeaderContainer, HeaderContent } from './styles';
import unimontesFrameroomLogo from '../../assets/unimontes-frameroom-logo.svg';
import { FiChevronDown, FiUser, FiMenu } from 'react-icons/fi';
import useMedia from '../../hooks/useMedia';

import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {

  const { user, signOut } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/rooms">
          <img src={unimontesFrameroomLogo} alt="" />
        </Link>
 
          <>
            <nav>
              <NavLink className="nav-link" to="/rooms/map">
                Mapa
              </NavLink>
              <div className="link-down">
                <NavLink end className="nav-link" to="/rooms">
                  Espaços
                </NavLink>
              </div>
              {user.isAdmin && (
                <div className="link-down">
                  <NavLink className="nav-link" to="/orders">
                    Reservas
                  </NavLink>
                </div>
              )}
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
       
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
