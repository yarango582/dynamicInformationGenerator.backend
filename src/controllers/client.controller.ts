import { getCustomRepository } from "typeorm";
import { UserRole } from "../enums/UserRoles.enums";
import { ClientRepository } from "../repositories/client.repository";
import { StatusCode } from "../enums/StatusCode.enums";
import Responses from "../interfaces/responses.interfaces";
import customMessages from '../locales/responseMessages.locales.json';
export default class ClientController {

    private readonly clientRepository: ClientRepository;

    constructor() {
        this.clientRepository = getCustomRepository(ClientRepository);
    }

    async add(nombre: string, documento: string, correo: string, telefono: string, rol: UserRole) {
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
    }

    async list() {
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
    }

    async listByDocument(document: string) {
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
    }

}