export default function createRoomCode(type: string, number: number){
    const roomType = type.substring(0, 3).toUpperCase();
    const roomCode = `${roomType}${number}`;

    return roomCode;

}
