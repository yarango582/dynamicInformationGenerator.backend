import client from './client.routers';
import test from './testConnection.routers';
import typesDb from './typesDb.routers';


const routes: any[] = [];

function uploadRoutes(...dependencies) {
    dependencies.forEach((dependency) => {
        routes.push(dependency);
    });
}

uploadRoutes(
    client, 
    test, 
    typesDb
    );

export default routes;