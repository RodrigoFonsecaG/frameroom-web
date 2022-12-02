import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteScheduleTable1670005523081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('schedules')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('schedules');
    }

}
