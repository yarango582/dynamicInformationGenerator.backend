import customMessages from '../locales/apiSystem.locales.json';
export default class Server {

    static init(port: unknown, instance: any, callback: () => void) {
        instance.listen(port, () => {
            console.log(`${customMessages.serverUp}${port} 🚀🚀🚀`);
        });
        callback();
    }

}