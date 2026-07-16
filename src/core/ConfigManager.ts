import fs from "fs";
import path from "path";
import { IConfig } from "../interfaces/IConfig";

export class ConfigManager {

    private static config: IConfig;

    public static load(): void {

        const env = process.env.TEST_ENV || "development";

        const file = path.join(process.cwd(), "config", `${env}.json`);

        const raw = fs.readFileSync(file, "utf-8");

        this.config = JSON.parse(raw);

    }

    public static get(): IConfig {

        return this.config;

    }

}