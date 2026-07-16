import fs from "fs";
import path from "path";
import { Session } from "../models/Session";
import { ConfigManager } from "./ConfigManager";

export class SessionManager {

    private static session: Session;

    private static runPath: string;

    public static initialize(): void {

        const config = ConfigManager.get();

        const env = process.env.TEST_ENV || "development";

        const timestamp = this.getTimestamp();

        const sessionId =
            `${config.applicationName.toUpperCase()}-${env.toUpperCase()}-${timestamp}`;

        this.runPath = path.join(
            process.cwd(),
            "runs",
            sessionId
        );

        fs.mkdirSync(this.runPath, { recursive: true });

        const folders = [
            "logs",
            "screenshots",
            "downloads",
            "videos",
            "traces",
            "reports"
        ];

        for (const folder of folders) {

            fs.mkdirSync(
                path.join(this.runPath, folder),
                { recursive: true }
            );

        }

        this.session = {
            sessionId,
            applicationName: config.applicationName,
            environment: env,
            browser: config.browser,
            startTime: new Date().toISOString(),
            status: "RUNNING"
        };

        this.saveMetadata();

    }

    public static complete(status: "PASSED" | "FAILED"): void {

        this.session.status = status;

        this.session.endTime = new Date().toISOString();

        this.saveMetadata();

    }

    public static getSession(): Session {

        return this.session;

    }

    public static getRunPath(): string {

        return this.runPath;

    }

    private static saveMetadata(): void {

        const file = path.join(
            this.runPath,
            "metadata.json"
        );

        fs.writeFileSync(
            file,
            JSON.stringify(this.session, null, 4)
        );

    }

    private static getTimestamp(): string {

        const now = new Date();

        return now
            .toISOString()
            .replace(/[-:]/g, "")
            .replace("T", "")
            .split(".")[0];

    }

}