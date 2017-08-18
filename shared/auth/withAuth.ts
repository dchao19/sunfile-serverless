import "reflect-metadata";
import { IHttpContext } from "../IContext";
import db from "../database/connect";
import * as jwt from "jsonwebtoken";
import * as jwksClient from "jwks-rsa";
import { Account } from "../entities/Account";
import { Article } from "../entities/Article";
import { Team } from "../entities/Team";
import { Source } from "../entities/Source";
import getSigningKey from "./getSigningKey";

const withAuthentication = (options: any) => {
    return (next: (context: IHttpContext) => void) => {
        return async (context: IHttpContext) => {
            // First, ensure that the authorization header was provided
            if (!context.req.headers || !context.req.headers["authorization"]) {
                context.res = {
                    success: false,
                    message: "Unauthorized",
                    errorCode: 401,
                    errorMessage: "The Authorization header was not supplied."
                };
                return;
            }

            let parts = context.req.headers["authorization"].split(" ");
            let token: string;

            if (parts.length == 2) {
                const scheme = parts[0];
                const credential = parts[1];

                if (/^Bearer/i.test(scheme)) {
                    token = credential;
                } else {
                    context.res = {
                        success: false,
                        message: "Unauthorized",
                        errorCode: 401,
                        errorMessage: "The Authorization scheme was not correct."
                    };
                    return;
                }
            } else {
                context.res = {
                    success: false,
                    message: "Unauthorized",
                    errorCode: 401,
                    errorMessage: "The Authorization header was not in the correct format."
                };
                return;
            }

            if (!token) {
                context.res = {
                    success: false,
                    message: "Unauthorized",
                    errorCode: 401,
                    errorMessage: "No authorization JWT token could be found."
                };
                return;
            }

            let decoded: {} | any;
            try {
                decoded = jwt.decode(token, { complete: true });
            } catch (err) {
                context.res = {
                    success: false,
                    message: "Unauthorized",
                    errorCode: 401,
                    errorMessage: "The token supplied in the request was invalid"
                };
                return;
            }

            if (!decoded) {
                context.res = {
                    success: false,
                    message: "Unauthorized",
                    errorCode: 401,
                    errorMessage: "The token supplied in the request was invalid"
                };
                return;
            }

            try {
                let key = await getSigningKey(decoded.header.kid);

                const verified: any = jwt.verify(token, key, { algorithms: ["RS256"] });

                if (!db.isConnected) {
                    await db.connect();
                }

                let users = db.getRepository(Account);

                let user = await users.findOne({ userCode: verified.sub });

                if (user) {
                    context.req.user = user;
                } else {
                    let newUser = new Account();
                    newUser.userCode = verified.sub;
                    newUser.email = "daniel@danielchao.me";
                    newUser.name = "Daniel Chao";
                    newUser.teamCode = "HEGHEG123";

                    await users.persist(newUser);

                    context.req.user = newUser;
                }

                next(context);
            } catch (e) {
                context.res = {
                    success: false,
                    message: "Unauthorized",
                    errorCode: 401,
                    errorMessage: "The token supplied in the request failed validation"
                };
                return;
            }
        };
    };
};

export { withAuthentication };
