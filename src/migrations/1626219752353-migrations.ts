import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1626219752353 implements MigrationInterface {
    name = 'migrations1626219752353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "db_client" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "tipoDb" character varying NOT NULL, "host" character varying NOT NULL, "contrasena" character varying, "usuario_remoto" character varying, "clientIdId" integer, CONSTRAINT "PK_0e061b6948cd8a965f80c6fb2ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "client_rol_enum" AS ENUM('root', 'user', 'ghost')`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "documento" character varying NOT NULL, "correo" character varying NOT NULL, "telefono" character varying, "rol" "client_rol_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "db_client" ADD CONSTRAINT "FK_2a9c500339dfc352f463eb28da5" FOREIGN KEY ("clientIdId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db_client" DROP CONSTRAINT "FK_2a9c500339dfc352f463eb28da5"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "client_rol_enum"`);
        await queryRunner.query(`DROP TABLE "db_client"`);
    }

}
