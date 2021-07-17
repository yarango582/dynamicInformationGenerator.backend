import { createConnections } from "typeorm";
import customMessages from '../locales/apiSystem.locales.json';


export class ConnectionPoolManager {

    async openConnections(name: string, type: string, host: string, port: number, username: string, password: string, database: string) {
        try {
            const connections = await createConnections([
                { name, type: type as any, host, port, username, password, database }
            ]);
            connections.forEach((connection) => console.log(`${customMessages.poolConnectionsOpen}:${connection.name}`));
        } catch (error) {
            return error;
        }
    }
}