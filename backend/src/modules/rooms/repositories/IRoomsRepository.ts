import Room from "../infra/typeorm/entities/Room";
import IRoomDTO from '../dtos/IRoomDTO'


export default interface IRoomsRepository {
    create(data: IRoomDTO): Promise<Room>;
    findRoom(room_code: string): Promise<Room | undefined>;
    find(): Promise<Room[]>;
    update(data: IRoomDTO): Promise<Room>;
    delete(room_code: string): Promise<Room>;
}
