import React, {useCallback, useContext, useRef} from 'react';
import { Container, MainContent, Footer } from './styles';
import { FiLogIn, FiMail } from 'react-icons/fi';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import SignInBackground from '../../components/SignInBackground';
import SignInContent from '../../components/SignInContent';
import Button from '../../components/Button';
import { Form } from '@unform/web'

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';

import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';



interface SignInFormData{
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { addToast } = useToast();


  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatório')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await signIn({
          email: data.email,
          password: data.password
        });

        navigate('/rooms')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais'
        });

      }
    },
    [signIn, navigate, addToast]
  );


  return (
    <Container>
      <SignInBackground />

      <SignInContent>
        <MainContent>
          <Form ref={formRef} onSubmit={handleSubmit} className="sign">
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

            <Button type="submit" text="Entrar" />
          </Form>
        </MainContent>

        <Footer>
          <div className="footer">
            <FiLogIn size={30} />
            <Link to="/sign-up">Criar conta</Link>
          </div>
          </Footer>
      </SignInContent>
    </Container>
  );
};

export default SignIn;
