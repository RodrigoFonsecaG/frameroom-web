import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { NextFunction, Request, Response } from "express";
import UsersRepository from "../../typeorm/repositories/UsersRepository";

export function needAdmin() {
    return async (request: Request, response: Response, next: NextFunction) => {
        console.log(request.user);

        const { cpf } = request.user;



        const usersRepository = new UsersRepository();

        const user = await usersRepository.findByCPF(cpf);

        if (!user) {
            return response.status(400).json("User does not exists!");
        }

        if (!user.isAdmin) {
            return response.status(401).end();
        }

        return next();
    }
}
