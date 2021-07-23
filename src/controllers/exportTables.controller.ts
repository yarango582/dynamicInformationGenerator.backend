import { getConnection, Connection, Table, TableExclusion } from 'typeorm';
import { GetTablesDbClient } from './getTablesDbClient.controller';
import { ExportDataUtil } from '../utils/exportData.util';
import path from 'path';
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

            for await (const iterator of tables) {
                await this.executeQuery(iterator, connection);
            }
            return true;
        } catch (error) {
            return error.message;
        }
    }

    async executeQuery(table: Table, connection: Connection) {
        try {
            const columns = await this.getColumns(table);
            const rawData = await connection.query(`
            SELECT ${columns} 
            FROM ${table.name}
            `);

            const data = await this.formatDataPush(rawData, columns);
            await ExportDataUtil.createTxt(';' + data.join(';')
                , `${path.dirname(__dirname)}/tmp/1088327285-yeisonarango03@gmail.com/${table.name}.txt`);
            return rawData;
        } catch (error) {
            console.log(error.message);
        }
    }

    async getColumns(table: Table) {
        return table.columns.map(element => element.name);
    }

    async formatDataPush(rawData: any, columns: string[]) {
        const data: string[] = [];
        for await (const iterator of rawData) {
            data.push(
                iterator[columns[0]], iterator[columns[1]], iterator[columns[2]],
                iterator[columns[3]], iterator[columns[4]], iterator[columns[5]],
                iterator[columns[6]], iterator[columns[7]], iterator[columns[8]],
                iterator[columns[9]], iterator[columns[10]], iterator[columns[11]],
                iterator[columns[12]], iterator[columns[13]], iterator[columns[14]],
                iterator[columns[15]], iterator[columns[16]], iterator[columns[17]],
                iterator[columns[18]], iterator[columns[19]], iterator[columns[20]],
                iterator[columns[21]], iterator[columns[22]], iterator[columns[23]],
                iterator[columns[24]], iterator[columns[25]], iterator[columns[26]],
                iterator[columns[27]], iterator[columns[28]], iterator[columns[29]],
                iterator[columns[30]], iterator[columns[31]], iterator[columns[32]],
                "\n");
        }
        return data;
    }

}