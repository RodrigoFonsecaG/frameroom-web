import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const authenticateUser = new AuthenticateUserService(fakeUserRepository,);
        const createUser = new CreateUserService(fakeUserRepository);

        const user = await createUser.execute({
            cpf: '1111111111',
            name: 'John Doe',
            phone: '38999999999',
            email: 'johndoe@example.com',
            password: '123',
            passwordConfirm: '123',
            type_code: 1,
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });


        it('should not be able to authenticate with non existing user', async () => {
            const fakeUserRepository = new FakeUserRepository();
            const authenticateUser = new AuthenticateUserService(
                fakeUserRepository,
            );

            expect(authenticateUser.execute({
                email: 'johndoe10@example.com',
                password: '123',
            })).rejects.toBeInstanceOf(AppError)
        });


        it('should not be able to authenticate with wrong password', async () => {
            const fakeUserRepository = new FakeUserRepository();
            const authenticateUser = new AuthenticateUserService(
                fakeUserRepository,
            );
            const createUser = new CreateUserService(fakeUserRepository);

            await createUser.execute({
                cpf: '1111111111',
                name: 'John Doe',
                phone: '38999999999',
                email: 'johndoe@example.com',
                password: '123',
                passwordConfirm: '123',
                type_code: 1,
            });



            expect(authenticateUser.execute({
                email: 'johndoe@example.com',
                password: 'wrong-password',
            })).rejects.toBeInstanceOf(AppError)

        });
});
