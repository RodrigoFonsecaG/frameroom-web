import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ReCreatingSchedulesTable1670005558352 implements MigrationInterface {

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
                                name: 'interval',
                                type: 'int',
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
