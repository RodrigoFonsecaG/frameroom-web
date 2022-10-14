import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSchedules1665323547189 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'schedules',
                columns: [
                    {
                        name: 'room_code',
                        type: 'varchar',
                        length: '6',
                        isPrimary: true,
                    },
                    {
                        name: 'day',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'interval_1',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_2',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_3',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_4',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_5',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_6',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_7',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_8',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_9',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_10',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_11',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_12',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_13',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_14',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_15',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'interval_16',
                        type: 'varchar',
                        length: '50',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'schedules',
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
        await queryRunner.dropTable('schedules');
    }
}
