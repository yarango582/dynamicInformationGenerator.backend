import express from 'express';
import ClientController from '../controllers/client.controller';

const router: express.Router = express.Router();

router.post('/api/v1/client', async (req, res) => {
    const { nombre, documento, correo, telefono, rol } = req.body;
    const clientController: ClientController = new ClientController();
    const result = await clientController.add(nombre, documento, correo, telefono, rol);
    res.status(result.statusCode).json({
        result
    });
});

router.get('/api/v1/client', async (req, res) => {
    const clientController: ClientController = new ClientController();
    const result = await clientController.list();
    res.status(result.statusCode).json({
        result
    });
});

router.get('/api/v1/client/:document', async (req, res) => {
    const clientController: ClientController = new ClientController();
    const { document } = req.params;
    const result = await clientController.listByDocument(document);
    res.status(result.statusCode).json({
        result
    });
});

export default router;