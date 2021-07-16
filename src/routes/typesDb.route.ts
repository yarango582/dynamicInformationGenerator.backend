import express from 'express';
import { StatusCode } from '../enums/StatusCode.enums';
import { typesDB } from '../enums/typesDb.enums';
import customMessages from '../locales/responseMessages.locales.json';

const router: express.Router = express.Router();

router.get('/api/v1/typesdb', async (req, res) => {
    res.status(StatusCode.OK).json({
        message: customMessages.successfulRequest,
        data: typesDB
    });
});

export default router;