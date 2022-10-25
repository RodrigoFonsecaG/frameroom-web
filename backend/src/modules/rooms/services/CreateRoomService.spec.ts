import CreateRoomService from './CreateRoomService';
import FakeRoomRepository from '../repositories/fakes/FakeRoomsRepository';
import createRoomCode from '@shared/utils/createRoomCode';
import AppError from '@shared/errors/AppError';

describe('CreateRoom', () => {
    it('should be able to create a new room', async () => {
        const fakeRoomRepository = new FakeRoomRepository();
        const createRoom = new CreateRoomService(fakeRoomRepository);

        const room_code = createRoomCode('LAB', 1);

        const room = await createRoom.execute({
            room_code,
            room_type: 'LAB',
            room_number: 1,
            capacity: 30,
            floor: 1,
            description: 'espaço legal',
            availability: 1,
            image: 'http://',
        });

        expect(room).toHaveProperty('room_code');
        expect(room).toHaveProperty('room_type');
        expect(room).toHaveProperty('room_number');
        expect(room).toHaveProperty('capacity');
        expect(room).toHaveProperty('floor');
        expect(room).toHaveProperty('description');
        expect(room).toHaveProperty('availability');
        expect(room).toHaveProperty('image');
    });

    it('should not be able to create two rooms with the same primary code', async () => {
        const fakeRoomRepository = new FakeRoomRepository();
        const createRoom = new CreateRoomService(fakeRoomRepository);

        const room_code = createRoomCode('LAB', 1);

        await createRoom.execute({
            room_code,
            room_type: 'LAB',
            room_number: 1,
            capacity: 30,
            floor: 1,
            description: 'espaço legal',
            availability: 1,
            image: 'http://',
        });

        expect(createRoom.execute({
            room_code,
            room_type: 'LAB',
            room_number: 1,
            capacity: 30,
            floor: 1,
            description: 'espaço legal',
            availability: 1,
            image: 'http://',
        })).rejects.toBeInstanceOf(AppError);
    });
});
