import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users_type')
class UserType {
    @PrimaryColumn()
    type_code: number;

    @Column()
    type: string;
}

export default UserType;
