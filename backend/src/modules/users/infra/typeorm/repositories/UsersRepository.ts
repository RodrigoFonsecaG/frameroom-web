import { EntityRepository, getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';
import IUserDTO from '@modules/users/dtos/ICreateUser';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmailCPF(
        email: string,
        cpf: string,
    ): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne({
            where: [{ email }, { cpf }],
        });

        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne({
            where: { email },
        });

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
        const user = this.ormRepository.create({
            cpf,
            name,
            phone,
            email,
            password,
            type_code,
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async find(): Promise<User[]> {
        const Users = await this.ormRepository.find();

        return Users;
    }
}

export default UsersRepository;
