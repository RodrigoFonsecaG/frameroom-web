import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../../infra/typeorm/entities/User';
import IUserDTO from '@modules/users/dtos/ICreateUser';

class UsersRepository implements IUsersRepository {

    private users: User[] = [];
    
    public async findByEmailCPF(
        email: string,
        cpf: string,
    ): Promise<User | undefined> {
        const findUser = this.users.find(
            user => user.email === email || user.cpf === cpf,
        );

        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async findByCPF(cpf: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.cpf === cpf);

        return findUser;
    }

    public async create({
        cpf,
        name,
        phone,
        email,
        password,
        type_code,
    }: IUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            cpf,
            name,
            phone,
            email,
            password,
            type_code
        })

        this.users.push(user);

        return user;
    }

}

export default UsersRepository;
