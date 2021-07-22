import { getCustomRepository } from "typeorm";
import { ConnectionPoolManager } from "../db/connectionPoolManager.db";
import Responses from "../interfaces/responses.interface";
import { DbClientRepository } from "../repositories/dbClient.repository";
import customMessages from '../locales/responseMessages.locales.json';
import { StatusCode } from "../enums/StatusCode.enums";

export default class OpenConnectionsController {
    private readonly dbClientRepository: DbClientRepository;

    constructor() {
        this.dbClientRepository = getCustomRepository(DbClientRepository);
    }

    async open() {
        try {
            const connectionPoolManager: ConnectionPoolManager = new ConnectionPoolManager();
            const result = await this.dbClientRepository.listAll();
            
            const errors: any [] = [];
            if (result!) {
                for await (const i of result) {
                   errors.push(await connectionPoolManager.openConnections(i.nombre, i.tipoDb, i.host, i.puerto, i.usuario_remoto, i.contrasena, i.nombre)); 
                }
            }
            if(errors[0]!= null){
                return {
                    message: errors as any,
                    statusCode: StatusCode.BAD_REQUEST
                } as Responses;
            }
            return {
                message: customMessages.successfulRequest,
                statusCode: StatusCode.OK
            } as Responses;
        } catch (error) {
            return {
                message: error.message,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            } as Responses;
        }
    }

}