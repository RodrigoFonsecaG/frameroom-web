import { EntityRepository, Repository } from 'typeorm';
import IRoomsRepository from '@modules/rooms/repositories/IRoomsRepository';
import Room from '../entities/Room';

@EntityRepository(Room)
class AppointmentsRepository extends Repository<Room> implements IRoomsRepository {
    public async findRoom(room_code: string): Promise<Room | undefined> {
        const findRoom = await this.findOne({
            where: { room_code: room_code },
        });

        return findRoom;
    }
}

export default AppointmentsRepository;
