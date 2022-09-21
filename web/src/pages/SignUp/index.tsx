import React from 'react';
import { Container, MainContent, Footer } from './styles';
import { FiMail, FiUser, FiPhone, FiUsers } from 'react-icons/fi';
import { MdKeyboardBackspace, MdOutlineBadge } from 'react-icons/md';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import SignInBackground from '../../components/SignInBackground';
import SignInContent from '../../components/SignInContent';

const SignUp = () => {
  return (
    <Container>
      <SignInContent>
        <MainContent>
          <form className="sign">
            <h1>Faça seu cadastro</h1>

            <div className="input-group">
              <Input icon={FiUser} name="name" placeholder="Nome" type="text" />
              <Input
                icon={FiMail}
                name="email"
                placeholder="E-mail"
                type="text"
              />
              <Input
                icon={MdOutlineBadge}
                name="cpf"
                placeholder="CPF"
                type="text"
                iconSize={23}
              />
              <Input
                icon={FiPhone}
                name="phone"
                placeholder="Telefone"
                type="text"
              />

              <InputPassword
                name="password"
                placeholder="Senha"
                type="password"
              />

              <InputPassword
                name="confirm-password"
                placeholder="Confirme sua senha"
                type="password"
              />

              <Input
                icon={FiUsers}
                name="user_type"
                placeholder="Tipo de usuário"
                type="text"
              />


            </div>

            <button type="submit">Concluir cadastro</button>
          </form>
        </MainContent>

        <Footer>
          <div className="footer">
            <MdKeyboardBackspace size={30} />
            <a href="">Voltar para login</a>
          </div>
        </Footer>
      </SignInContent>

      <SignInBackground />
    </Container>
  );
};

export default SignUp;
