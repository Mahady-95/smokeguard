import fs from "fs";
import path from "path";
import "dotenv/config";

import { IConfig } from "../interfaces/IConfig";

export class ConfigManager {

    private static config: IConfig;

    public static load(): void {

        const env = (process.env.TEST_ENV || "development").toLowerCase();

        const file = path.join(
            process.cwd(),
            "config",
            `${env}.json`
        );

        const raw = fs.readFileSync(file, "utf-8");

        const config = JSON.parse(raw);

        let username = "";
        let password = "";

        switch (env) {

            case "production":

                username = process.env.PROD_USERNAME ?? "";
                password = process.env.PROD_PASSWORD ?? "";
                break;

            case "staging":

                username = process.env.STAGING_USERNAME ?? "";
                password = process.env.STAGING_PASSWORD ?? "";
                break;

            default:

                username = process.env.DEV_USERNAME ?? "";
                password = process.env.DEV_PASSWORD ?? "";
                break;

        }

        this.config = {

            ...config,

            username,

            password

        };

    }

    public static get(): IConfig {

        if (!this.config) {

            throw new Error(
                "Configuration has not been loaded."
            );

        }

        return this.config;

    }

}