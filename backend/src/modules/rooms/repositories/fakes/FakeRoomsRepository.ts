import { EntityRepository } from 'typeorm';
import IRoomsRepository from '@modules/rooms/repositories/IRoomsRepository';
import Room from '../../infra/typeorm/entities/Room';
import IRoomDTO from '@modules/rooms/dtos/IRoomDTO';

@EntityRepository(Room)
class RoomsRepository implements IRoomsRepository {
    private rooms: Room[] = [];

    public async findRoom(room_code: string): Promise<Room | undefined> {
        const findRoom = this.rooms.find(room => room.room_code === room_code);

        return findRoom;
    }

    public async create({
        room_code,
        room_type,
        room_number,
        capacity,
        floor,
        description,
        availability,
        image,
    }: IRoomDTO): Promise<Room> {
        const room = new Room();

        Object.assign(room, {
            room_code,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image,
        });

        this.rooms.push(room);

        return room;
    }

    public async update({
        room_code,
        old_room_code,
        room_type,
        room_number,
        capacity,
        floor,
        description,
        availability,
        image,
    }: IRoomDTO): Promise<Room> {
        const room = new Room();


        Object.assign(room, {
            room_code,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image,
        });

        this.rooms.push(room);

        return room;
    }

    public async find(): Promise<Room[]> | null {
        return;
    }
}

export default RoomsRepository;
