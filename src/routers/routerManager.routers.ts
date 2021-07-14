

export default class RouterManager {

    static async init(instance: any, routes: any[]) {
        routes.forEach((route) => instance.use(route));
        console.log('RouterManager loaded!');
    }
}