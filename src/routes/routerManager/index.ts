import client from '../client.route';
import test from '../testConnection.route';
import typesDb from '../typesDb.route';
import dbClient from '../dbClient.route';
import openConnectionsDb from '../openConnectionsDb.route';
import checkConnectionTables from '../checkConnectionTables.route';

const routes: any[] = [];

function uploadRoutes(...dependencies) {
    dependencies.forEach((dependency) => {
        routes.push(dependency);
    });
}

// importa las rutas y cargalas aqui
uploadRoutes(
    client, 
    test, 
    typesDb,
    dbClient,
    openConnectionsDb,
    checkConnectionTables
    );

export default routes;