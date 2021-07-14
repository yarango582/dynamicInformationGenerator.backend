import express from 'express';

const router = express.Router();

router.get('/api/v1/testConnection', async (req, res) => {

    res.status(200).json({
        response: "server up",
        statusCode: 200
    })
});

export default router;