import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';

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

    @Expose({name: 'image_url'})
    getImageUrl(): string | null {
        return this.image
            ? `${process.env.APP_API_URL}/files/${this.image}`
            : null;
    }
}

export default Room;
