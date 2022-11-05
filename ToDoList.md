Adicionar:
- Verificar backend da solicitações de reserva
- Adicionar react-select
- Excluir imagem do espaço quando ele for deletado


# Redefinição de senha
**RF**
- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**
- Utilizar Mailtrap para testar envios em ambientes de desenvolvimento;
- Utilizar Amazon SES ou NodeMailer para envios em produção;
- O envio de e-mails deve acontecer em segundo plano;

**RN**
- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua 




# Espaços
**RF**
- O usuario deve poder listar todos os espaços disponiveis e indisponiveis para reserva
- O usuario deve poder selecionar e visualizar um espaço especifico
- O administrador deve poder selecione e editar um espaço especifico
- O usuario deve poder filtrar os espaços por: tipo e andar
**RNF**
- A listagem dos espaços deve ser armazenada em cache;
**RN**
- O usuario não deve poder selecionar um espaço para edição





# Espaço especifico
**RF**
- O usuario deve poder visualizar todas as informações do espaço selecionado
- O usuario deve ser capaz de selecionar uma opção de reservar o espaço selecionado
- O administrador deve poder cadastrar ou editar ou excluir o espaço selecionado
**RNF**
- Deve ser utilizados Yup para a validação dos campos
- Deve ser utilizados Toasts para enviar informações ao usuario
**RN**
- O administrador deve preencher todos os campos
- O administrador não deve poder criar um espaço já existente
- O usuario não deve ter acesso a botões de salvar/editar/excluir
- O usuario não deve poder editar campos




# Horários (manhã, tarde, noite)
**RF**
- O usuário deve poder visualizar os horários do espaço selecionado

**RNF**
- Utilizar o JCalendar ou React Table para gerenciar os horarios
- Deve ser utilizados Toasts para enviar informações ao usuario

**RN**
- O usuário não deve poder adicionar/editar/excluir algum horario
- O administrador deve poder adicionar/editar/excluir algum horario
- Para adicionar/editar/excluir um horário, após o preenchimento da tabela, o administrador deve acionar o botão "Salvar horários"
- As opções de horarios devem estar disponiveis entre 07h10 ás 22h40





# Solicitação de reserva de espaço (usuarios)
**RF**
- O usuario deve poder selecionar todos os espaços cadastrados, menos aqueles que tem status não disponivel
- O usuario deve poder selecionar mais de um intervalo de horario
- O usuario deve poder realizar uma solicitação de reserva de espaço

**RNF**
- Deve ser utilizados Yup para a validação dos campos
- Deve ser utilizados Toasts para enviar informações ao usuario

**RN**
- O usuario deve preencher todos os campos
- O usuario deve selecionar um intervalo de horário valido (horario final não pode ser maior que horario de inicio)
- As opções de horarios devem estar disponiveis entre 07h10 ás 22h40
- O usuario não pode agendar para mais de 30 dias contando do dia atual







# Listagem de reserva de espaço (administrador)
# Solicitação de reserva de espaço especifica (administrador)

# Home
- Mapa interativo
- Filtros
- Switch de Modo TV


# Modo TV

# Listagem de espaço
- Filtros

# Espaço especifico
- Exclusão de espaço
- Botão para reservar espaço (apenas usuarios comuns)





# Funcionalidades opcionais





# Menu mobile

# Menu dropdown

