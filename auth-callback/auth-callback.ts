import { IHttpContext } from "../shared/IContext";

export default async function run(context: IHttpContext) {
    context.log.info(context.req.query);
}
