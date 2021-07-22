import { getConnection, Connection, Table } from 'typeorm';
import { GetTablesDbClient } from './getTablesDbClient.controller';
export class ExportTableController {

    private getTablesDbClient: GetTablesDbClient = new GetTablesDbClient();

    async exportTables(connectionName: string, tables: string) {
        const tablesResult = await this.getTables(connectionName, tables);
        return tablesResult;
    }

    async getTables(connectionName: string, tables: string) {
        const arrayTables: string[] = tables.split(',');
        try {
            const connection = getConnection(connectionName);
            const tables = await connection.createQueryRunner()
                .getTables(arrayTables);
            this.executeQuery(tables[0], connection);
            return true;
        } catch (error) {
            return error.message;
        }
    }

    async executeQuery(table: Table, connection: Connection) {
        try {
            const result = await connection.query(`SELECT * FROM ${table.name}`);
            console.log('resultado del query: ' + result);
        } catch (error) {
            console.log(error.message);
        }
    }

}