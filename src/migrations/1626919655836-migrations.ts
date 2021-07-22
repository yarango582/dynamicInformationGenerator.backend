import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1626919655836 implements MigrationInterface {
    name = 'migrations1626919655836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "documento" character varying NOT NULL, "correo" character varying NOT NULL, "telefono" character varying, "rol" "client_rol_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "db_client" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "tipoDb" character varying NOT NULL, "host" character varying NOT NULL, "contrasena" character varying NOT NULL, "usuario_remoto" character varying NOT NULL, "puerto" integer NOT NULL, "clientId" integer, CONSTRAINT "PK_0e061b6948cd8a965f80c6fb2ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "config_tables_client" ("id" SERIAL NOT NULL, "tables" character varying NOT NULL, "dbClientId" integer, CONSTRAINT "REL_60ff91aa0415a24a9bdaafe8df" UNIQUE ("dbClientId"), CONSTRAINT "PK_6ea13ae949d5a50be8a6c573ffd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "db_client" ADD CONSTRAINT "FK_2b689964acc9e0dce8f110e592a" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "config_tables_client" ADD CONSTRAINT "FK_60ff91aa0415a24a9bdaafe8df1" FOREIGN KEY ("dbClientId") REFERENCES "db_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "config_tables_client" DROP CONSTRAINT "FK_60ff91aa0415a24a9bdaafe8df1"`);
        await queryRunner.query(`ALTER TABLE "db_client" DROP CONSTRAINT "FK_2b689964acc9e0dce8f110e592a"`);
        await queryRunner.query(`DROP TABLE "config_tables_client"`);
        await queryRunner.query(`DROP TABLE "db_client"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
