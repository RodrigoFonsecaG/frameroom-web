export default interface IRoomDTO {
    room_code: string;
    old_room_code?: string;
    room_type: string;
    room_number: number;
    capacity: number;
    floor: number;
    description: string;
    availability: number;
    image: string;
}
