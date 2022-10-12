import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('rooms')
class Room {
    @PrimaryColumn()
    room_code: string;

    @Column()
    room_type: string;

    @Column()
    room_number: number;

    @Column()
    capacity: number;

    @Column()
    floor: number;

    @Column('text')
    description: string;

    @Column()
    availability: number;

    @Column()
    image?: string;
}

export default Room;
