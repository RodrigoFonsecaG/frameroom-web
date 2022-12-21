import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsers1665263732463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'cpf',
                        type: 'varchar',
                        length: '14',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '60',
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '15'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '60',
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'type_code',
                        type: 'int',
                    },
                    {
                        name: 'isAdmin',
                        type: 'boolean',
                        default: false
                    }
                ],
            }),
        );

        await queryRunner.createForeignKey('users',
            new TableForeignKey({
                columnNames: ["type_code"],
                referencedColumnNames: ["type_code"],
                referencedTableName: "users_type"
            })
        );

    }



    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('users');
    }

}


