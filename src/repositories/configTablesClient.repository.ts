import { Repository, EntityRepository } from 'typeorm';
import { ConfigTablesClient } from '../models/ConfigTablesClient.model';

@EntityRepository(ConfigTablesClient)
export class ConfigTablesClientRepository extends Repository<ConfigTablesClient>{

    async add(tables: string, dbClient: number) {
        return await this.insert({
            tables,
            dbClient: dbClient as any
        })
    }

    async updateConfgi(dbClient: number, tables: string){
        return await this.update({
            dbClient: dbClient as any
        }, {
            tables
        });
    }

    async listById(dbClientId: number){
        return this.findOne({
            where: {
                dbClient: dbClientId
            }
        })
    }

}