import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Room from '@modules/rooms/infra/typeorm/entities/Room';

@Entity('non_fixed_schedules')
class NonFixedSchedule {
    @PrimaryColumn()
    room_code: string;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_code' })
    room: Room;

    @PrimaryColumn()
    interval: number;

    @PrimaryColumn()
    week: string;

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

export default NonFixedSchedule;
