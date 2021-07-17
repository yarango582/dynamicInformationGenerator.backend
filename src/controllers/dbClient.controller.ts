import { getCustomRepository } from 'typeorm';
import { typesDB } from '../enums/typesDb.enums';
import { DbClientRepository } from '../repositories/dbClient.repository';
import Responses from '../interfaces/responses.interface';
import customMessages from '../locales/responseMessages.locales.json';
import { StatusCode } from '../enums/StatusCode.enums';
export default class DbClientController {

    private readonly dbClientRepository: DbClientRepository;

    constructor() {
        this.dbClientRepository = getCustomRepository(DbClientRepository);
    }

    async add(nombre: string, tipoDb: typesDB, host: string, contrasena: string, usuario_remoto: string, clientId: number, puerto: number) {
        try {
            const result = await this.dbClientRepository.add(nombre, tipoDb, host, contrasena, usuario_remoto, clientId, puerto);
            if (result) {
                return {
                    message: customMessages.successfulRequest,
                    statusCode: StatusCode.CREATED
                } as Responses;
            } else {
                return {
                    message: customMessages.incompleteInformation,
                    statusCode: StatusCode.BAD_REQUEST
                } as Responses;
            }
        } catch (error) {
            return {
                message: error.message,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR
            } as Responses;
        }
    }

    async list() {
        try {
            const result = await this.dbClientRepository.listAll();
            if (result) {
                return {
                    message: customMessages.successfulRequest,
                    statusCode: StatusCode.OK,
                    data: result
                } as Responses;
            } else {
                return {
                    message: customMessages.notFound,
                    statusCode: StatusCode.NOT_FOUND
                } as Responses;
            }
        } catch (error) {
            return {
                message: error.message,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR
            } as Responses;
        }
    }

    async listByIdClient(idClient: number) {
        try {
            const result = await this.dbClientRepository.listOne(idClient);
            if (result) {
                return {
                    message: customMessages.successfulRequest,
                    statusCode: StatusCode.OK,
                    data: result
                } as Responses;
            } else {
                return {
                    message: customMessages.notFound,
                    statusCode: StatusCode.NOT_FOUND
                } as Responses;
            }   
        } catch (error) {
            return {
                message: error.message,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR
            } as Responses;
        }
    }
}