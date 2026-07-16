import winston from "winston";
import path from "path";
import { SessionManager } from "./SessionManager";

export class Logger {

    private static logger: winston.Logger;

    public static initialize(): void {

        this.logger = winston.createLogger({

            level: "info",

            format: winston.format.combine(

                winston.format.timestamp({

                    format: "YYYY-MM-DD HH:mm:ss"

                }),

                winston.format.printf(({ timestamp, level, message }) => {

                    return `${timestamp} [${level.toUpperCase()}] ${message}`;

                })

            ),

            transports: [

                new winston.transports.Console(),

                new winston.transports.File({

                    filename: path.join(
                        SessionManager.getRunPath(),
                        "logs",
                        "smoke.log"
                    )

                })

            ]

        });

    }

    private static ensureInitialized(): void {

        if (!this.logger) {

            throw new Error(
                "Logger has not been initialized."
            );

        }

    }

    public static banner(): void {

        this.ensureInitialized();

        this.logger.info("");

        this.logger.info("==================================================");

        this.logger.info("               SmokeGuard Framework");

        this.logger.info("==================================================");

        this.logger.info("");

    }

    public static step(message: string): void {

        this.ensureInitialized();

        this.logger.info(`▶ ${message}`);

    }

    public static info(message: string): void {

        this.ensureInitialized();

        this.logger.info(message);

    }

    public static success(message: string): void {

        this.ensureInitialized();

        this.logger.info(`✔ ${message}`);

    }

    public static warn(message: string): void {

        this.ensureInitialized();

        this.logger.warn(message);

    }

    public static error(message: string): void {

        this.ensureInitialized();

        this.logger.error(message);

    }

}