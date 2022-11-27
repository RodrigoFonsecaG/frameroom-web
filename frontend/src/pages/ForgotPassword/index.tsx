import React, { useCallback, useContext, useRef, useState } from 'react';
import { Container, MainContent, Footer } from './styles';
import { FiLogIn, FiMail } from 'react-icons/fi';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import SignInBackground from '../../components/SignInBackground';
import SignInContent from '../../components/SignInContent';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';

import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

import { schemaForgotPassword, schemaSignIn } from '../../schemas/schemas';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      
      try {
        setLoading(true);

        formRef.current?.setErrors({});
        await schemaForgotPassword.validate(data, {
          abortEarly: false
        });

        //recuperação de senha
        await api.post('/password/forgot', {
          email: data.email
        })

         addToast({
           type: 'sucess',
           title: 'E-mail de recuperação enviado!',
           description:
             'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
         });

        // navigate('/rooms')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente'
        });
      }
      finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return (
    <Container>
      <SignInBackground />

      <SignInContent>
        <MainContent>
          <Form ref={formRef} onSubmit={handleSubmit} className="sign">
            <div className="header">
              <h1>Esqueceu sua senha?</h1>
              <p>Sua redefinição de senha será enviada para seu e-mail.</p>
            </div>

            <div className="input-group">
              <Input
                icon={FiMail}
                name="email"
                placeholder="E-mail"
                type="text"
              />
            </div>

            <Button loading={loading} type="submit" text="Recuperar senha" />
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

export default ForgotPassword;
