import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    const { cpf, name, phone, email, password, passwordConfirm, type_code } =
        request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        cpf,
        name,
        phone,
        email,
        password,
        passwordConfirm,
        type_code,
    });

    delete user.password;

    return response.json(user);
});

export default usersRouter;
