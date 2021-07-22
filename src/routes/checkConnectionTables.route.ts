import express from 'express';
import { StatusCode } from '../enums/StatusCode.enums';
import customMessages from '../locales/responseMessages.locales.json';
import { GetTablesDbClient } from '../controllers/getTablesDbClient.controller';
import { SaveAutomaticConfigTablesController } from '../controllers/saveAutomatiConfigTables.controller';

const router: express.Router = express.Router();

router.post('/api/v1/gettables/:dbClientId/:database', async (req, res) => {
    const connections = new GetTablesDbClient();
    const { database, dbClientId } = req.params;
    const { tables } = req.body;
    await connections.getConnectionDb(database);

    const existTables = await connections.getConnectionTables(tables);
    let updateAutomatic: any = '';

    if (existTables[0] === true) {
        updateAutomatic = await SaveAutomaticConfigTablesController.init(tables, Number(dbClientId));
    }

    res.status(StatusCode.OK).json({
        message: customMessages.successfulRequest,
        processCorrect: existTables,
        isUpdated: updateAutomatic
    });

});

export default router;