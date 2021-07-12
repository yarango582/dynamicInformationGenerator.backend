export default class Server {

    static init(port: unknown, instance: any, callback: () => void) {
        instance.listen(port, () => {
            console.log(`[server] => running at port: ${port} 🚀🚀🚀`);
        });
        callback();
    }

}