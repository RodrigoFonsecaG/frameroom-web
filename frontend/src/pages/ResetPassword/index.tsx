import React, { useCallback, useContext, useRef, useState } from 'react';
import { Container, MainContent, Footer } from './styles';
import { FiLogIn, FiMail } from 'react-icons/fi';
import InputPassword from '../../components/InputPassword';
import SignInBackground from '../../components/SignInBackground';
import SignInContent from '../../components/SignInContent';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

import { schemaResetPassword } from '../../schemas/schemas';
import api from '../../services/api';

interface ForgotPasswordFormData {
  password: string;
  passwordConfirm: string;
}

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const location = useLocation();


  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      
      try {
        setLoading(true);

        formRef.current?.setErrors({});
        await schemaResetPassword.validate(data, {
          abortEarly: false
        });

        //recuperação de senha
        const token = location.search.replace('?token=', '');
        const { password, passwordConfirm } = data

        if (!token) {
          throw new Error();
        }
        await api.post('/password/reset', {
          password,
          passwordConfirm,
          token
        })

         addToast({
           type: 'sucess',
           title: 'Senha redefinida com sucesso!',
           description:
             'Agora você já pode acessar o FrameRoom utilizando sua nova senha.'
         });

        navigate('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description:
            'Ocorreu um erro ao resetar sua senha, tente novamente.'
        });
      }
      finally {
        setLoading(false);
      }
    },
    [addToast, location.search, navigate]
  );

  return (
    <Container>
      <SignInBackground />

      <SignInContent>
        <MainContent>
          <Form ref={formRef} onSubmit={handleSubmit} className="sign">
            <div className="header">
              <h1>Redefinição de senha </h1>
              <p>Escolha uma nova senha para acessar o FrameRoom</p>
            </div>

            <div className="input-group">
              <InputPassword
                name="password"
                placeholder="Senha"
                type="password"
              />

              <InputPassword
                name="passwordConfirm"
                placeholder="Confirme sua senha"
                type="password"
              />
            </div>

            <Button loading={loading} type="submit" text="Redefinir senha" />
          </Form>
        </MainContent>

        <Footer>
          <div className="footer">
            <FiLogIn size={30} />
            <Link to="/">Voltar ao login</Link>
          </div>
        </Footer>
      </SignInContent>
    </Container>
  );
};

export default ResetPassword;
