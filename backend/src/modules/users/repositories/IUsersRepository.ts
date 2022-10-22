import IUserDTO from '../dtos/ICreateUser';
import User from '../infra/typeorm/entities/User'

export default interface IUsersRepository {
    //Metodos:
    //Encontrar por email ou cpf
    // Encontrar por email
    //Criar usuario

    findByEmailCPF(email: string, cpf: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: IUserDTO): Promise<User>;
}
