import { EntityRepository, getRepository, Repository } from 'typeorm';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import User from '../entities/User';
import UserToken from '../entities/UserToken';

@EntityRepository(User)
class UserTokensRepository implements IUserTokenRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }


    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token },
        });

        return userToken;
    }

    public async generate(user_cpf: string): Promise<UserToken>{
        const userToken = this.ormRepository.create({
            user_cpf
        })

        await this.ormRepository.save(userToken);


        return userToken;
    }


}

export default UserTokensRepository;
