import * as Yup from 'yup';

const schemaSignUp = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  cpf: Yup.string()
    .required('CPF obrigatório')
    .matches(
      /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/,
      'Digite um CPF válido'
    ),
  phone: Yup.string()
    .required('Telefone obrigatório')
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      'Digite um telefone válido'
    ),
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

const schemaSignIn = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().required('Senha obrigatório')
});

export { schemaSignIn, schemaSignUp };
