import React from 'react';
import { Container, Content, Background } from './styles';
import logoFrameroom from '../../assets/logo-frameroom.png';
import logoUnimontes from '../../assets/unimontes-white-logo.png';
import { FiLogIn, FiMail, FiLock, FiEye } from 'react-icons/fi';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Background>
        <img src={logoUnimontes} alt="Unimontes" />
      </Background>

      <Content>
        <img src={logoFrameroom} alt="Frameroom" />
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

        <div className="create-account">
           <FiLogIn size={30} />
        <a href="">Criar conta</a>
        </div>
        

      </Content>
    </Container>
  );
};

export default SignIn;
