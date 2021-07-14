import client from './client.routers';
import test from './testConnection.routers';

const routes:any[] = [];

routes.push(client);
routes.push(test);

export default routes;