import express from 'express';
import ClientController from '../controllers/client.controller';

const router = express.Router();

router.post('/api/v1/client', async (req, res) => {
    const { nombre, documento, correo, telefono, rol } = req.body;
    const clientController: ClientController = new ClientController();
    const result = await clientController.add(nombre, documento, correo, telefono, rol);
    res.status(result).json({
        response: "",
        statusCode: result
    })
});

export default router;