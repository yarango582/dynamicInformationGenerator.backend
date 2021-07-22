import fs from 'fs/promises';

export class ExportDataUtil {

    static async createTxt(data: any, route: string) {
        return await fs.writeFile(route, data, {
            encoding: 'utf-8'
        });
    }

    static async createDirectory(route: string) {
        return await fs.mkdir(route);
    }
}