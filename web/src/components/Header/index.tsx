import React from 'react';
import { Header, HeaderContent } from './styles';
import unimontesFrameroomLogo from '../../assets/unimontes-frameroom-logo.svg';
import { FiChevronDown, FiUser } from 'react-icons/fi';

const index = () => {
  return (
    <Header>
      <HeaderContent>
        <img src={unimontesFrameroomLogo} alt="" />
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
        </nav>

        <div className="profile-navbar">
          <div className="user-info">
            <span>Aluno</span>
            <p>aluno@gmail.com</p>
          </div>

          <div className="user-photo">
            <FiUser size={20}/>
          </div>
        </div>
      </HeaderContent>
    </Header>
  );
};

export default index;
