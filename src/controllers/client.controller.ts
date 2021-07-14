import { getCustomRepository } from "typeorm";
import { UserRole } from "../enums/UserRoles.enums";
import { ClientRepository } from "../repositories/client.repository";
import { StatusCode } from "../enums/StatusCode.enums";

export default class ClientController {

    private readonly clientRepository: ClientRepository;

    constructor() {
        this.clientRepository = getCustomRepository(ClientRepository);
    }

    async add(nombre: string, documento: string, correo: string, telefono: string, rol: UserRole) {
        const result = await this.clientRepository.add(nombre, documento, correo, telefono, rol);
        if (result) {
            return StatusCode.CREATED;
        } else {
            return StatusCode.BAD_REQUEST;
        }
    }

}