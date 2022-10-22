import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import UserType from './UserType';

@Entity('users')
class User {
    @PrimaryColumn()
    cpf: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    type_code: number;

    @ManyToOne(() => UserType)
    @JoinColumn({ name: 'type_code' })
    users_type: UserType;

    @Column()
    isAdmin: boolean;
}

export default User;
