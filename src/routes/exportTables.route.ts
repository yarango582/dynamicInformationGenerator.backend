import express from 'express';
import { ExportTableController } from '../controllers/exportTables.controller';
import { DbClientController } from '../controllers/dbClient.controller';
import { SaveAutomaticConfigTablesController } from '../controllers/saveAutomatiConfigTables.controller';
import { StatusCode } from '../enums/StatusCode.enums';
import customMessages from '../locales/responseMessages.locales.json';

const router: express.Router = express.Router();

router.get('/api/v1/exporttables/:idClient/:database', async (req, res) => {

    const { database, idClient } = req.params;

    const dbClientController: DbClientController = new DbClientController();
    const saveAutomaticConfigTablesController: SaveAutomaticConfigTablesController = new SaveAutomaticConfigTablesController();
    const exportTableController: ExportTableController = new ExportTableController();

    const consultDbClient = await dbClientController.listByIdClient(Number(idClient), database);
    consultDbClient.statusCode === StatusCode.OK ?
        saveAutomaticConfigTablesController.getConfig(consultDbClient.data.id).then(async (response) => {
            if (response.statusCode === 200) {
                const result = await exportTableController.exportTables(consultDbClient.data.nombre, response.data.tables);
                res.status(200).json({
                    result
                });
            } else {
                res.status(response.statusCode).json({
                    message: customMessages.notFound
                });
            }
        }) : res.status(consultDbClient.statusCode).json({ consultDbClient });

});

export default router;