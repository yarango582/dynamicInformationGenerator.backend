import { getConnection } from 'typeorm';

export class GetTablesDbClient {

    private connectionName: string;
    async getConnectionDb(connectionName: string) {
        try {
            this.connectionName = connectionName;
            return getConnection(this.connectionName);
        } catch (error) {
            return error.message;
        }
    }

    async getConnectionTables(tablesNames: string) {
        const arrayTables: string [] = tablesNames.split(',');
        try {
            const connection = await this.getConnectionDb(this.connectionName);
            const tables = await connection.createQueryRunner()
                .getTables(arrayTables);
            if (arrayTables.length === tables.length) {
                return [true, tables.length];
            } else {
                return [false, tables.length];
            }
        } catch (error) {
            return error.message;
        }
    }

}