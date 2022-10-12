import React, { useCallback, useRef } from 'react';
import { Container, MainContent, Footer } from './styles';
import { FiMail, FiUser, FiPhone, FiUsers } from 'react-icons/fi';
import { MdKeyboardBackspace, MdOutlineBadge } from 'react-icons/md';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import SignInBackground from '../../components/SignInBackground';
import SignInContent from '../../components/SignInContent';
import Button from '../../components/Button';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Select from '../../components/Select';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import { Link, useNavigate } from 'react-router-dom';

import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  type_code: number;
}

const SignUp = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string()
            .required('CPF obrigatório')
            .length(11, 'CPF inválido'),
          phone: Yup.string()
            .required('Telefone obrigatório')
            .length(11, 'Telefone inválido'),
          password: Yup.string()
            .required('Senha obrigatório')
            .min(6, 'No mínimo 6 dígitos'),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais')
            .required('Confirmação de senha obrigatório'),
          type_code: Yup.number()
            .required('Cargo obrigatório')
            .lessThan(10, 'Selecione uma opção')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await api.post('/users', data);

        navigate('/');
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [navigate]
  );

  return (
    <Container>
      <SignInContent>
        <MainContent>
          <Form ref={formRef} onSubmit={handleSubmit} className="sign">
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
                placeholder="CPF (apenas números)"
                type="number"
                iconSize={23}
              />
              <Input
                icon={FiPhone}
                name="phone"
                placeholder="Telefone com DD"
                type="number"
              />

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

              <Select
                name="type_code"
                icon={FiUsers}
                iconSize={20}
                defaultValue={99}
              >
                <option disabled hidden value={99}>
                  Selecione seu cargo
                </option>
                <option value={0}>Técnico</option>
                <option value={1}>Docente CCET</option>
                <option value={1}>Discente CCET</option>
                <option value={3}>Docente</option>
                <option value={4}>Discente</option>
                <option value={5}>Outros</option>
              </Select>
            </div>

            <Button type="submit" text="Concluir cadastro" />
          </Form>
        </MainContent>

        <Footer>
          <div className="footer">
            <MdKeyboardBackspace size={30} />
            <Link to="/">Voltar para login</Link>
          </div>
        </Footer>
      </SignInContent>

      <SignInBackground />
    </Container>
  );
};

export default SignUp;
