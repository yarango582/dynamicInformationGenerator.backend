import { getConnection, Connection, Table, TableExclusion } from 'typeorm';
import { GetTablesDbClient } from './getTablesDbClient.controller';
import { ExportDataUtil } from '../utils/exportData.util';
import { Separator } from '../enums/Separator.enums';
import path from 'path';
import { MomentUtil } from '../utils/moment.util';
import { CreateZip } from '../utils/createZip.util';
export class ExportTableController {

    private getTablesDbClient: GetTablesDbClient = new GetTablesDbClient();

    async exportTables(connectionName: string, tables: string, user: any) {
        const tablesResult = await this.getTables(connectionName, tables, user);
        return tablesResult;
    }

    async getTables(connectionName: string, tables: string, user: any) {
        const arrayTables: string[] = tables.split(',');
        try {
            const connection = getConnection(connectionName);
            const tables = await connection.createQueryRunner()
                .getTables(arrayTables);
            for await (const iterator of tables) {
                await this.executeQuery(iterator, connection, user);
            }
            return true;
        } catch (error) {
            return error.message;
        }
    }

    // aqui sale el exportable de los planos al servidor
    async executeQuery(table: Table, connection: Connection, user: any) {
        try {
            const columns = await this.getColumns(table);
            const rawData = await connection.query(`
            SELECT ${columns} 
            FROM ${table.name}
            `);
            const data = await this.formatDataPush(rawData, columns);
            const date = MomentUtil.getDate('YYYY[6]MMDD');
            const dir = `${path.dirname(__dirname)}/tmp/${user.data.documento}/${user.data.documento}-${date}`;
            await ExportDataUtil.createTxt(Separator.puntoYcoma + data.join(Separator.puntoYcoma)
                , `${dir}/${table.name}.txt`);
            await CreateZip.createDocument(`${user.data.documento}-${date}.zip`, `${dir}`);
            return rawData;
        } catch (error) {
            console.log(error);
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