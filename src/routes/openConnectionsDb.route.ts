import express from 'express';
import OpenConnectionsController from '../controllers/openConnections.controller';

const router: express.Router = express.Router();

router.get('/api/v1/openconnections', async (req, res) => {
    const openConnectionsController: OpenConnectionsController = new OpenConnectionsController();
    const result =  await openConnectionsController.open();
    res.status(result.statusCode).json({
        result
    });
});

export default router;