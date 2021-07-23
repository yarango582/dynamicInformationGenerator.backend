import child_process from "child_process";

export class CreateZip {
    static async createDocument(name: string, output: string) {
        return child_process.exec(`zip -r ${name} *`, {
            cwd: output
        }, (error) => error);
    }
}