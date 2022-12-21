import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersType1665263274847 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_type',
                columns: [
                    {
                        name: 'type_code',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        length: '20',
                    },
                ],
            }),


        );

        await queryRunner.query(`INSERT INTO users_type (type_code, type)
        VALUES (0, 'Técnico') , (1, 'Docente CCET'), (2, 'Discente CCET'), (3, 'Docente'), (4, 'Dicente'), (5, 'Outros'), (9, 'Administrador');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('users_type');
    }
}


