import { run } from "../retrieve-article-data";
import { mockRequestData } from "../../shared/mockRequestData";
import { IHttpContext, HttpMethod, IContextLogger } from "../../shared/IContext";
import axios from "axios";
import * as fs from "fs";

let log: any = (message: string) => {};
log.error = (message: any) => {
    console.error(message);
};
log.warn = (message: any) => {};
log.info = (message: any) => {};
log.verbose = (message: any) => {};

const getContext = (
    template: string,
    method: HttpMethod,
    query?: any,
    headers?: any,
    body?: any,
    rawBody?: string
): IHttpContext => {
    return {
        req: {
            originalUrl: `http://localhost:7071/${template}`,
            method,
            query,
            headers,
            body,
            rawBody
        },
        res: {},
        done: jest.fn(),
        log: log as IContextLogger
    };
};

describe("retrieve-article-data tests", async () => {
    test("should return the correct successful response", async () => {
        const context = getContext(
            "api/article/data",
            "POST",
            {},
            {},
            {},
            fs.readFileSync("./shared/testdata/testarticle.html").toString()
        );

        await run(context);

        expect(context.res.success).toBeTruthy();
    });
});
