import { Repository, EntityRepository } from 'typeorm';
import { Client } from '../models/Client.model';
import { UserRole } from '../enums/UserRoles.enums';
import customMessages = require('../locales/responseMessages.locales.json');

@EntityRepository(Client)
export class ClientRepository extends Repository<Client>{

    async add(nombre: string, documento: string, correo: string, telefono: string, rol: UserRole) {

        const result = await this.find({ where: { documento } });
        if (result.length > 0) {
            return false;
        } else {
           await this.insert({ nombre, documento, correo, telefono, rol });
           return true;
        }
    }

    async listAll() {
        return await this.find();
    }

    async listOne(documento: string) {
        return await this.findOne({
            where: {
                documento
            }
        });
    }
}
