import { getCustomRepository } from 'typeorm';
import Responses from '../interfaces/responses.interface';
import customMessages from '../locales/responseMessages.locales.json';
import { StatusCode } from '../enums/StatusCode.enums';
import { ConfigTablesClientRepository } from '../repositories/configTablesClient.repository';

export class SaveAutomaticConfigTablesController {

    private configTablesClientRepository: ConfigTablesClientRepository;

    constructor() {
        this.configTablesClientRepository = getCustomRepository(ConfigTablesClientRepository);
    }

    static async init(tables: string, dbClientId: number) {
        const configTablesClientRepository: ConfigTablesClientRepository = getCustomRepository(ConfigTablesClientRepository);
        try {
            const result = await configTablesClientRepository.add(tables, dbClientId);
            if (result) {
                return {
                    message: customMessages.successfulRequest,
                    statusCode: StatusCode.OK
                } as Responses;
            } else {
                return {
                    message: customMessages.retryAgain,
                    statusCode: StatusCode.BAD_REQUEST
                } as Responses;
            }
        } catch (error) {
            return {
                message: customMessages.retryAgain,
                statusCode: StatusCode.BAD_REQUEST,
                data: error
            } as Responses;
        }
    }

    async getConfig(dbClientId: number) {
        try {
            const result = await this.configTablesClientRepository.listById(dbClientId);
            if (result) {
                return {
                    message: customMessages.successfulRequest,
                    statusCode: StatusCode.OK,
                    data: result
                } as Responses;
            } else {
                return {
                    message: customMessages.retryAgain,
                    statusCode: StatusCode.BAD_REQUEST
                } as Responses;
            }
        } catch (error) {
            return {
                message: customMessages.retryAgain,
                statusCode: StatusCode.BAD_REQUEST,
                data: error.message
            } as Responses;
        }

    }
}