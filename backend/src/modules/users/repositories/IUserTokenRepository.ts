import UserToken from "../infra/typeorm/entities/UserToken";

export default interface IUserTokensRepository{
    generate(user_cpf: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken>;
}
