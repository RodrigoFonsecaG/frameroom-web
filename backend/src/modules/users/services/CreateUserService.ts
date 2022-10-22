import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    cpf: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    passwordConfirm: string;
    type_code: number;
}

class CreateUserService {

    constructor(private usersRepository: IUsersRepository) {}

    public async execute({
        cpf,
        name,
        phone,
        email,
        password,
        passwordConfirm,
        type_code,
    }: IRequest): Promise<User> {

        //Conferir se cpf e email ja existe
        const checkUserExists = await this.usersRepository.findByEmailCPF(email, cpf);

        if (checkUserExists) {
            throw new AppError('Email or CPF already used');
        }

        // Conferir se as senhas sao iguais
        if (password !== passwordConfirm) {
            throw new AppError('Passwords must matches');
        }

        // Criptograr senha
        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            cpf,
            name,
            phone,
            email,
            password: hashedPassword,
            type_code,
        });

        return user;
    }
}

export default CreateUserService;
