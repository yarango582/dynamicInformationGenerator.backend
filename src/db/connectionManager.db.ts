import { createConnections } from "typeorm";

export default class ConnectionManagerDb {
    static async init(){
        return await createConnections()
    }
}