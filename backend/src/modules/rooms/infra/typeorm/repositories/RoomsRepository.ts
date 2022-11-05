import { EntityRepository, getRepository, Repository } from 'typeorm';
import IRoomsRepository from '@modules/rooms/repositories/IRoomsRepository';
import Room from '../entities/Room';
import IRoomDTO from '@modules/rooms/dtos/IRoomDTO';

@EntityRepository(Room)
class RoomsRepository implements IRoomsRepository {
    private ormRepository: Repository<Room>;

    constructor() {
        this.ormRepository = getRepository(Room);
    }

    public async findRoom(room_code: string): Promise<Room | undefined> {
        const findRoom = await this.ormRepository.findOne({
            where: { room_code: room_code },
        });

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
        const room = this.ormRepository.create({
            room_code,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image,
        });

        await this.ormRepository.save(room);

        return room;
    }

    public async delete(room_code: string): Promise<Room> {
        this.ormRepository.delete({room_code: room_code});

        return;
    }

    public async find(): Promise<Room[]> {
        const rooms = await this.ormRepository.find();

        return rooms;
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
        const updatedRoom = {
            room_code,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image,
        };

        await this.ormRepository.update(
            { room_code: old_room_code },
            {
                room_code,
                room_type,
                room_number,
                capacity,
                floor,
                description,
                availability,
                image,
            },
        );

        return updatedRoom;
    }
}

export default RoomsRepository;
