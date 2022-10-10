import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateOrders1665319079298 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
                columns: [
                    {
                        name: 'order_code',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'hour_start',
                        type: 'time',
                    },
                    {
                        name: 'hour_end',
                        type: 'time',
                    },
                    {
                        name: 'user_cpf',
                        type: 'varchar',
                        length: '14',
                    },
                    {
                        name: 'room_code',
                        type: 'varchar',
                        length: '6',
                    },
                    {
                        name: 'message',
                        type: 'text',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                columnNames: ['room_code'],
                referencedColumnNames: ['room_code'],
                referencedTableName: 'rooms',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                columnNames: ['user_cpf'],
                referencedColumnNames: ['cpf'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }
}
