import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoom1665256124115 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rooms',
                columns: [
                    {
                        name: 'room_code',
                        type: 'varchar',
                        length: '6',
                        isPrimary: true,
                    },
                    {
                        name: 'room_type',
                        type: 'varchar',
                        length: '12',
                    },
                    {
                        name: 'room_number',
                        type: 'int',
                    },
                    {
                        name: 'capacity',
                        type: 'int',
                    },
                    {
                        name: 'floor',
                        type: 'int',
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'availability',
                        type: 'int',
                        default: 1,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rooms');
    }
}
