import React from 'react';
import { Container, MainContent, Footer } from './styles';
import { FiLogIn, FiMail } from 'react-icons/fi';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import SignInBackground from '../../components/SignInBackground';
import SignInContent from '../../components/SignInContent';

const SignIn: React.FC = () => {
  return (
    <Container>
      <SignInBackground />

      <SignInContent>

        <MainContent>
          <form className="sign">
            <h1>Faça seu login</h1>

            <div className="input-group">
              <Input
                icon={FiMail}
                name="email"
                placeholder="E-mail"
                type="text"
              />

              <InputPassword
                name="password"
                placeholder="Senha"
                type="password"
              />
            </div>

            <div className="login-commands">
              <div>
                <input type="checkbox" name="Lembrar-me" id="checkbox" />
                <label htmlFor="checkbox">Lembrar-me</label>
              </div>

              <a href="forgot">Esqueci minha senha</a>
            </div>

            <button type="submit">Entrar</button>
          </form>
        </MainContent>

        <Footer>
          <div className="footer">
            <FiLogIn size={30} />
            <a href="">Criar conta</a>
          </div>
        </Footer>
        
      </SignInContent>
    </Container>
  );
};

export default SignIn;
