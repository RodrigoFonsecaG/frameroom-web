import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/User";
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from "../errors/AppError";

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        //Verificar se email existe
        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        // Verificando se senha está correta
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        //Gerando token JWT
        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.cpf,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;

