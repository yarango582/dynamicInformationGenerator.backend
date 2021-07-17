import { getCustomRepository } from "typeorm";
import { UserRole } from "../enums/UserRoles.enums";
import { ClientRepository } from "../repositories/client.repository";
import { StatusCode } from "../enums/StatusCode.enums";
import customMessages from '../locales/responseMessages.locales.json';
import Responses from "../interfaces/responses.interface";
export default class ClientController {

    private readonly clientRepository: ClientRepository;

    constructor() {
        this.clientRepository = getCustomRepository(ClientRepository);
    }

    async add(nombre: string, documento: string, correo: string, telefono: string, rol: UserRole) {
        try {
            const result = await this.clientRepository.add(nombre, documento, correo, telefono, rol);
            if (result) {
                return {
                    message: result as any,
                    statusCode: StatusCode.CREATED
                } as Responses;
            } else {
                return {
                    message: customMessages.documentExistent,
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
            const result = await this.clientRepository.listAll();
            if (result) {
                return {
                    message: customMessages.successfulRequest,
                    statusCode: StatusCode.OK,
                    data: result
                } as Responses;
            } else {
                return {
                    message: customMessages.retryAgain,
                    statusCode: StatusCode.NOT_FOUND,
                } as Responses;
            }
        } catch (error) {
            return {
                message: error.message,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR
            } as Responses;
        }
    }

    async listByDocument(document: string) {
        try {
            const result = await this.clientRepository.listOne(document);
            if (result) {
                return {
                    message: customMessages.successfulRequest,
                    statusCode: StatusCode.OK,
                    data: result
                } as Responses;
            } else if (result === undefined) {
                return {
                    message: customMessages.notFound,
                    statusCode: StatusCode.NOT_FOUND,
                } as Responses;
            } else {
                return {
                    message: customMessages.incompleteInformation,
                    statusCode: StatusCode.BAD_REQUEST,
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