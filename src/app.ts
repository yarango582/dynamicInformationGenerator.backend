import express from 'express';
import dotenv from 'dotenv';
import server from './server/server';
import morgan from 'morgan';
import "reflect-metadata"; //dependencia del orm

const app: express.Application = express();
dotenv.config();
const port: unknown = process.env.PORT || 8000;

app.use(morgan('combined'));

server.init(port, app, async () => {
    //carga de dependencias sobre el servidor de manera asincrona
    
});

export default app;