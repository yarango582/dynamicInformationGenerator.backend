import express from 'express';
import dotenv from 'dotenv';
import server from './server/server';
import morgan from 'morgan';
import ConnectionManagerDb from './db/connectionManager.db';
import "reflect-metadata"; //dependencia del orm
import RouterManager from './routes/routerManager/routerManager.routers';
import routes from './routes/routerManager/index';

const app: express.Application = express();
dotenv.config();
const port: unknown = process.env.PORT || 8000;

app.use(morgan('combined'));
app.use(express.json());


server.init(port, app, async () => {
    await ConnectionManagerDb.init();
    await RouterManager.init(app, routes);
});

export default app;