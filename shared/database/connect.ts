import "reflect-metadata";
import { getConnectionManager } from "typeorm";
import { Account } from "../entities/Account";
import { Team } from "../entities/Team";
import { Source } from "../entities/Source";
import { Article } from "../entities/Article";

const connectionManager = getConnectionManager();
export default connectionManager.create({
    driver: {
        type: "mssql",
        host: "sunfile.database.windows.net",
        port: 1433,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "sunfile",
        extra: {
            options: {
                encrypt: true
            }
        }
    },
    entities: [Account, Team, Source, Article]
});
