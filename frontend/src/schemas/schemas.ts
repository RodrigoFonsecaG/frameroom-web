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

const schemaCreateRoom = Yup.object().shape({
  room_type: Yup.string().required('Tipo do espaço obrigatório'),
  room_number: Yup.string().required('Número obrigatório'),
  floor: Yup.number().required('Andar obrigatório'),
  capacity: Yup.string().required('Capacidade obrigatória'),
  description: Yup.string().required('Descrição obrigatória'),
  availability: Yup.string().required('Disponibilidade obrigatória'),
  image: Yup.mixed().required('Imagem obrigatória')
});

const schemaEditRoom = Yup.object().shape({
  room_type: Yup.string().required('Tipo do espaço obrigatório'),
  room_number: Yup.string().required('Número obrigatório'),
  floor: Yup.number().required('Andar obrigatório'),
  capacity: Yup.string().required('Capacidade obrigatória'),
  description: Yup.string().required('Descrição obrigatória'),
  availability: Yup.string().required('Disponibilidade obrigatória')
});

const schemaCreateOrder = Yup.object().shape({
  room_code: Yup.string().required('Espaço obrigatório'),
  message: Yup.string().required('Motivo de reserva é obrigatório'),
  date: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('Data obrigatória')
    .min(new Date(), 'Data deve ser posterior ao dia atual'),
  hour_start: Yup.string()
    .required('Hora de início obrigatória')
    .max(5, 'Selecione um horário válido'),
  hour_end: Yup.string()
    .required('Hora final obrigatória')
    .max(5, 'Selecione um horário válido')
});

export {
  schemaSignIn,
  schemaSignUp,
  schemaCreateRoom,
  schemaEditRoom,
  schemaCreateOrder
};
