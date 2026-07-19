import { BrowserManager } from "../core/BrowserManager";
import { LoginEngine } from "./LoginEngine";
import { CrawlerEngine } from "./CrawlerEngine";
import { ConfigManager } from "../core/ConfigManager";
import { Logger } from "../core/Logger";
import { SessionManager } from "../core/SessionManager";
import { DiscoveryEngine } from "./DiscoveryEngine";
import { ReportEngine } from "./ReportEngine";


export class ExecutionManager {

    public static async execute(): Promise<void> {

        try {

            ConfigManager.load();

            SessionManager.initialize();

            Logger.initialize();

            Logger.banner();

            Logger.step("Loading Configuration");

            Logger.success("Configuration Loaded");

            Logger.step("Launching Browser");

            await BrowserManager.launch();

            Logger.success("Browser Started");
            await LoginEngine.login();
            await DiscoveryEngine.discover();
            await CrawlerEngine.crawl();
            await ReportEngine.generate();

        }

        catch (error) {

            try {

                SessionManager.complete("FAILED");

            }
            catch {
                // Ignore
            }

            Logger.error(
                error instanceof Error
                    ? error.message
                    : String(error)
            );

            throw error;

        }

    }

    public static async finish(): Promise<void> {

        try {

            await BrowserManager.close();

            SessionManager.complete("PASSED");

            Logger.success("Execution Finished");

        }

        catch (error) {

            Logger.error(
                error instanceof Error
                    ? error.message
                    : String(error)
            );

            throw error;

        }

    }

}