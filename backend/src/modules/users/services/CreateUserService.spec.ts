import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        const user = await createUser.execute({
            cpf: '1111111111',
            name: 'John Doe',
            phone: '38999999999',
            email: 'john@example.com',
            password: '123',
            passwordConfirm: '123',
            type_code: 1,
        });

        expect(user).toHaveProperty('cpf');
    });

    it('should not be able to create a new user with different password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);



        expect( createUser.execute({
            cpf: '1111111111',
            name: 'John Doe',
            phone: '38999999999',
            email: 'john@john.com',
            password: '123',
            passwordConfirm: '123000',
            type_code: 1,
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to create a new user with same email/cpf from another', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        await createUser.execute({
            cpf: '1111111111',
            name: 'John Doe',
            phone: '38999999999',
            email: 'john@john.com',
            password: '123',
            passwordConfirm: '123',
            type_code: 1,
        });

        expect(
            createUser.execute({
                cpf: '1111111111',
                name: 'John Doe',
                phone: '38999999999',
                email: 'john@john.com',
                password: '123',
                passwordConfirm: '123',
                type_code: 1,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
