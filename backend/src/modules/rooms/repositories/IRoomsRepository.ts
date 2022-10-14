import Room from "../infra/typeorm/entities/Room";

export default interface IRoomsRepository {
    findRoom(room_code: string): Promise<Room | undefined>;
}
