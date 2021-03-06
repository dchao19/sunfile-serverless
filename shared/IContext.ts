import { Account } from "./entities/Account";

export type HttpMethod =
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT"
    | "PATCH";

export interface IContextLogger {
    (message: string): void;
    error: (message: any) => void;
    warn: (message: any) => void;
    info: (message: any) => void;
    verbose: (message: any) => void;
}

export interface IContext {
    invocationId?: string;
    bindingData?: any;
    bindings?: any;
    log: IContextLogger;
    done: () => void;
}

export interface IHttpContext extends IContext {
    req: IHttpRequest;
    res: IHttpResponse | any;
}

export interface IHttpRequest {
    originalUrl: string;
    method: HttpMethod;
    query: { [s: string]: string };
    headers: { [s: string]: string };
    body: any;
    rawBody: string;
    user?: Account;
}

export interface IHttpResponse {
    body?: any;
    status?: number;
    isRaw?: boolean;
    headers?: {
        "Content-Type"?: string;
        "Content-Length"?: number;
        "Content-Disposition"?: string;
        "Content-Encoding"?: string;
        "Content-Language"?: string;
        "Content-Range"?: string;
        "Content-Location"?: string;
        "Content-md5"?: Buffer;
        "expires"?: Date;
        "last-modified"?: Date;
        [s: string]: any;
    };
}

export enum HttpStatusCodes {
    // 1XX Informational
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    Checkpoint = 103,

    // 2XX Success
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    IMUsed = 226,

    // 3XX Redirection
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    SwitchProxy = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,

    // 4XX Client Error
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    URITooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MethodFailure = 420,
    EnhanceYourCalm = 420,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    LoginTimeout = 440,
    NoResponse = 444,
    RetryWith = 449,
    BlockedByWindowsParentalControls = 450,
    UnavailableForLegalReasons = 451,
    Redirect = 451,
    SSLCertificateError = 495,
    SSLCertificateRequired = 496,
    HttpRequestSentToHttpsPort = 497,
    ClientClosedRequest = 499,
    InvalidToken = 498,
    TokenRequired = 499,
    RequestWasForbiddenByAntivirus = 499,

    // 5XX Server Error
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    BandwidthLimitExceeded = 509,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511,
    UnknownError = 520,
    WebServerIsDown = 521,
    ConnectionTimedOut = 522,
    OriginIsUnreachable = 523,
    ATimeoutOccurred = 524,
    SSLHandshakeFailed = 525,
    InvalidSSLCertificate = 526,
    SiteIsFrozen = 530
}
