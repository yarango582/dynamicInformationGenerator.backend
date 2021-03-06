import { Repository, EntityRepository } from 'typeorm';
import { DbClient } from '../models/DbClient.model';
import { typesDB } from '../enums/typesDb.enums';
@EntityRepository(DbClient)
export class DbClientRepository extends Repository<DbClient>{

    async add(nombre: string, tipoDb: typesDB, host: string, contrasena: string, usuario_remoto: string, clientId: number, puerto: number) {
        const result = await this.insert({
            nombre,
            tipoDb,
            host,
            contrasena,
            usuario_remoto,
            client: clientId as any,
            puerto
        });
        if (result) {
            return result;
        } else {
            return false;
        }
    }

    async listAll() {
        const result = await this.find({});
        if (result) {
            return result;
        } else {
            return false;
        }
    }

    async listOne(clientId: number, databaseName: string) {
        return await this.findOne({
            where: {
                client: clientId,
                nombre: databaseName,
            }
        });

    }

}
