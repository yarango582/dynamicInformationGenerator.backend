import customMessages from '../locales/apiSystem.locales.json';
export default class RouterManager {

    static async init(instance: any, routes: any[]) {
        routes.forEach((route) => instance.use(route));
        console.log(customMessages.routerManagerUploaded);
    }
}