import express from 'express';

const router: express.Router = express.Router();

router.get('/api/v1/testconnection', async (req, res) => {

    res.status(200).json({
        response: "server up",
        statusCode: 200
    })
});

export default router;