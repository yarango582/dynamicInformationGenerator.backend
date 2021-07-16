import express from 'express';
import DbClientController from '../controllers/dbClient.controller';

const router: express.Router = express.Router();

router.post('/api/v1/dbclient', async (req, res) => {
    const { nombre, tipoDb, host, contrasena, usuario_remoto, clientId } = req.body;
    const dbClientController: DbClientController = new DbClientController();
    const result = await dbClientController.add(nombre, tipoDb, host, contrasena, usuario_remoto, clientId);
    res.status(result.statusCode).json({
        result
    });
});

router.get('/api/v1/dbClient', async (req, res) => {
    const dbClientController: DbClientController = new DbClientController();
    const result = await dbClientController.list();
    res.status(result.statusCode).json({
        result
    });
});

router.get('/api/v1/dbClient/:clientId', async (req, res) => {
    const dbClientController: DbClientController = new DbClientController();
    const { clientId } = req.params;
    const result = await dbClientController.listByIdClient(Number(clientId));
    res.status(result.statusCode).json({
        result
    });
});

export default router;