import { IHttpContext } from "../shared/IContext";
import db from "../shared/database/connect";

export default async function run(context: IHttpContext) {
    try {
        await db.connect();
        context.res = {
            success: true,
            message: "success",
            result: {
                connected: true
            }
        };
    } catch (e) {
        context.res = {
            success: false,
            message: "failed",
            result: {
                connected: false
            }
        };
    }
}
