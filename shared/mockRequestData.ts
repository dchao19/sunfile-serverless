import { IHttpRequest, HttpMethod } from "./IContext";

export function mockRequestData(
    originalUrl: string,
    method: HttpMethod,
    query: { [s: string]: string },
    body: { [s: string]: any },
    headers: { [s: string]: any },
    rawBody: string
): IHttpRequest {
    return {
        originalUrl,
        method,
        query,
        headers,
        body,
        rawBody: ""
    };
}
