import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Room from './Room';


@Entity('schedules')
class Order {
    @PrimaryColumn()
    room_code: string;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_code' })
    room: Room;

    @PrimaryColumn()
    day: number;

    @Column()
    interval_1: string;

    @Column()
    interval_2: string;

    @Column()
    interval_3: string;

    @Column()
    interval_4: string;

    @Column()
    interval_5: string;

    @Column()
    interval_6: string;

    @Column()
    interval_7: string;

    @Column()
    interval_8: string;

    @Column()
    interval_9: string;

    @Column()
    interval_10: string;

    @Column()
    interval_11: string;

    @Column()
    interval_12: string;

    @Column()
    interval_13: string;

    @Column()
    interval_14: string;

    @Column()
    interval_15: string;

    @Column()
    interval_16: string;
}

export default Order;
