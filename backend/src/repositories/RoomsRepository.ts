import { EntityRepository, Repository } from 'typeorm';
import Room from '../models/Room';

@EntityRepository(Room)
class AppointmentsRepository extends Repository<Room> {
    public async findRoom(roomCode: string): Promise<Room | null> {

        const findRoom = await this.findOne({
            where: {room_code: roomCode}
        })

        return findRoom || null;
    }
}

export default AppointmentsRepository;
