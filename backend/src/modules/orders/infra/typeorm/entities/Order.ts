import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Room from '@modules/rooms/infra/typeorm/entities/Room';

import User from '../../../../users/infra/typeorm/entities/User';

@Entity('orders')
class Order {
    @PrimaryColumn('uuid')
    order_code: string;

    @Column('timestamp with time zone')
    date: Date;

    @Column('time')
    hour_start: Date;

    @Column('time')
    hour_end: Date;

    @Column()
    user_cpf: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_cpf' })
    user: User;

    @Column()
    room_code: string;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_code' })
    room: Room;

    @Column('text')
    message: string;
}

export default Order;
