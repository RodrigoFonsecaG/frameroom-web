import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Room from '@modules/rooms/infra/typeorm/entities/Room';

@Entity('schedules')
class Schedules {
    @PrimaryColumn()
    room_code: string;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_code' })
    room: Room;

    @PrimaryColumn()
    interval: number;

    @Column()
    day_0: string;

    @Column()
    day_1: string;

    @Column()
    day_2: string;

    @Column()
    day_3: string;

    @Column()
    day_4: string;

    @Column()
    day_5: string;

    @Column()
    day_6: string;
}

export default Schedules;
