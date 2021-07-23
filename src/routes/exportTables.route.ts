import express from 'express';
import { ExportTableController } from '../controllers/exportTables.controller';
import { DbClientController } from '../controllers/dbClient.controller';
import { ClientController } from '../controllers/client.controller';
import { SaveAutomaticConfigTablesController } from '../controllers/saveAutomatiConfigTables.controller';
import { StatusCode } from '../enums/StatusCode.enums';
import { MomentUtil } from '../utils/moment.util';
import customMessages from '../locales/responseMessages.locales.json';
import { ExportDataUtil } from '../utils/exportData.util';
import path from 'path';
import fs from 'fs';

const router: express.Router = express.Router();

router.get('/api/v1/exporttables/:idClient/:database', async (req, res) => {

    const { database, idClient } = req.params;

    const dbClientController: DbClientController = new DbClientController();
    const saveAutomaticConfigTablesController: SaveAutomaticConfigTablesController = new SaveAutomaticConfigTablesController();
    const exportTableController: ExportTableController = new ExportTableController();
    const clientController: ClientController = new ClientController();

    const consultDbClient = await dbClientController.listByIdClient(Number(idClient), database);
    consultDbClient.statusCode === StatusCode.OK ?
        saveAutomaticConfigTablesController.getConfig(consultDbClient.data.id).then(async (response) => {
            if (response.statusCode === 200) {
                // crear carpeta del dia
                const date = MomentUtil.getDate('YYYY[6]MMDD');
                const user = await clientController.listById(consultDbClient.data.id);
                const dir = `${path.dirname(__dirname)}/tmp/${user.data.documento}/${user.data.documento}-${date}`;
                if(!fs.existsSync(dir)){
                    await ExportDataUtil.createDirectory(dir);
                }
                const result = await exportTableController.exportTables(consultDbClient.data.nombre, response.data.tables, user);
                res.status(200).json({
                    exportandoInfo: true
                });
            } else {
                res.status(response.statusCode).json({
                    message: customMessages.notFound
                });
            }
        }) : res.status(consultDbClient.statusCode).json({ consultDbClient });

});

export default router;