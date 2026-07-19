import { BrowserManager } from "../core/BrowserManager";
import { EventManager } from "../core/EventManager";
import { Logger } from "../core/Logger";
import { ResultManager } from "../core/ResultManager";

import { QueueService } from "../services/QueueService";

import { ValidationResult } from "../models/ValidationResult";

import { PageLoadValidator } from "../validators/PageLoadValidator";

export class CrawlerEngine {

    public static async crawl(): Promise<void> {

        ResultManager.clear();

        const page = BrowserManager.getPage();

        while (!QueueService.isEmpty()) {

            const item = QueueService.dequeue();

            if (!item) {
                continue;
            }

            Logger.step(`Visiting : ${item.name}`);

            EventManager.reset();

            try {

                await page.goto(item.url, {
                    waitUntil: "domcontentloaded"
                });

                const pageLoaded =
                    await PageLoadValidator.validate(page);

                const consoleErrors =
                    EventManager.getConsoleErrors();

                const networkErrors =
                    EventManager.getNetworkErrors();

                const result: ValidationResult = {

                    pageName: item.name,

                    url: item.url,

                    passed:
                        pageLoaded &&
                        consoleErrors.length === 0 &&
                        networkErrors.length === 0,

                    pageLoaded,

                    consoleErrors,

                    networkErrors

                };

                ResultManager.add(result);

                if (result.passed) {

                    Logger.success(item.name);

                } else {

                    Logger.warn(item.name);

                    if (consoleErrors.length > 0) {

                        Logger.warn("Console Errors:");

                        consoleErrors.forEach(error =>

                            Logger.warn(`  • ${error}`)

                        );

                    }

                    if (networkErrors.length > 0) {

                        Logger.warn("Network Errors:");

                        networkErrors.forEach(error =>

                            Logger.warn(`  • ${error}`)

                        );

                    }

                }

            }

            catch (error) {

                Logger.error(`Failed : ${item.name}`);

                Logger.error(

                    error instanceof Error
                        ? error.message
                        : String(error)

                );

                ResultManager.add({

                    pageName: item.name,

                    url: item.url,

                    passed: false,

                    pageLoaded: false,

                    consoleErrors: [],

                    networkErrors: []

                });

            }

        }

        Logger.info("");
    }

}