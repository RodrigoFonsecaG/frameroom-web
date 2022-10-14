import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

interface Request {
    cpf: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    passwordConfirm: string;
    type_code: number;
}

class CreateUserService {
    public async execute({
        cpf,
        name,
        phone,
        email,
        password,
        passwordConfirm,
        type_code,
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        //Conferir se cpf e email ja existe
        const checkUserExists = await usersRepository.findOne({
            where: [{ email }, { cpf }],
        });

        if (checkUserExists) {
            throw new AppError('Email or CPF already used');
        }

        // Conferir se as senhas sao iguais
        if (password !== passwordConfirm) {
            throw new AppError('Passwords must matches');
        }

        // Criptograr senha
        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            cpf,
            name,
            phone,
            email,
            password: hashedPassword,
            type_code,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
