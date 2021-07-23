import moment from "moment";

export class MomentUtil {
    static getDate(format: string) {
        return moment().format(format);
    }
}