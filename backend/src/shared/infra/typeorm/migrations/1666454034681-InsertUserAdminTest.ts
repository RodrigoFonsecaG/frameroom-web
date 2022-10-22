import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertUserAdminTest1666454034681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `INSERT INTO users ("cpf", "name", "phone", "email", "password", "type_code", "isAdmin") VALUES (1111111111, 'Administrador', '00000000000', 'admin@admin.com', '$2a$08$flB.AvxKj.Lspq6RvQKi6.KPFeXMyEMxxSFJP5M7wDnMzrtN0ooPq', '9', true)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(
             `DELETE FROM users WHERE email = 'admin@admin.com'`,
         );
    }

}
