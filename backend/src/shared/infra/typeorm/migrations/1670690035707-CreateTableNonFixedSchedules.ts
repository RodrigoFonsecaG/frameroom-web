import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateTableNonFixedSchedules1670690035707
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'non_fixed_schedules',
                columns: [
                    {
                        name: 'room_code',
                        type: 'varchar',
                        length: '6',
                        isPrimary: true,
                    },
                    {
                        name: 'interval',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'week',
                        type: 'varchar',
                        length: '30',
                        isPrimary: true,
                    },
                    {
                        name: 'day_0',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'day_1',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'day_2',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'day_3',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'day_4',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'day_5',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'day_6',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                ],
            }),
        ),
            await queryRunner.createForeignKey(
                'non_fixed_schedules',
                new TableForeignKey({
                    columnNames: ['room_code'],
                    referencedColumnNames: ['room_code'],
                    referencedTableName: 'rooms',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('non_fixed_schedules');
    }
}
