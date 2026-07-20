import { BrowserManager } from "../core/BrowserManager";
import { EventManager } from "../core/EventManager";
import { Logger } from "../core/Logger";
import { ResultManager } from "../core/ResultManager";

import { QueueService } from "../services/QueueService";
import { ComponentService } from "../services/ComponentService";

import { ValidationResult } from "../models/ValidationResult";
import { ComponentInventory } from "../models/ComponentInventory";

import { PageLoadValidator } from "../validators/PageLoadValidator";

import { ScreenshotManager } from "../managers/ScreenshotManager";

import { ComponentValidator } from "../validators/ComponentValidator";

export class CrawlerEngine {

    public static async crawl(): Promise<void> {

        ResultManager.clear();

        ScreenshotManager.reset();

        const page = BrowserManager.getPage();

        while (!QueueService.isEmpty()) {

            const item = QueueService.dequeue();

            if (!item) {

                continue;

            }

            Logger.step(`Visiting : ${item.name}`);

            EventManager.reset();

            const started = Date.now();

            try {

                await page.goto(item.url, {

                    waitUntil: "domcontentloaded"

                });

                const executionTime =
                    Date.now() - started;

                const pageLoaded =
                    await PageLoadValidator.validate(page);

                const consoleErrors =
                    EventManager.getConsoleErrors();

                const networkErrors =
                    EventManager.getNetworkErrors();

                const components: ComponentInventory =
    await ComponentService.discover(page);

// Validate every discovered component
for (const component of components.elements) {

    await ComponentValidator.validate(

        page,

        component

    );

}

const passed =
    pageLoaded &&
    consoleErrors.length === 0 &&
    networkErrors.length === 0;

                const result: ValidationResult = {

                    pageName: item.name,

                    url: item.url,

                    passed,

                    pageLoaded,

                    executionTime,

                    screenshot: null,

                    consoleErrors,

                    networkErrors,

                    timestamp:
                        new Date().toISOString(),

                    components

                };

                ResultManager.add(result);

                if (passed) {

                    Logger.success(
                        `${item.name} (${executionTime} ms)`
                    );

                }

                else {

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

                const emptyComponents: ComponentInventory = {

                    forms: 0,

                    inputs: 0,

                    buttons: 0,

                    links: 0,

                    tables: 0,

                    dropdowns: 0,

                    checkboxes: 0,

                    radios: 0,

                    textareas: 0,

                    images: 0,

                    fileUploads: 0,

                    searchBoxes: 0,

                    paginations: 0,

                    filters: 0,

                    elements: []

                };

                ResultManager.add({

                    pageName: item.name,

                    url: item.url,

                    passed: false,

                    pageLoaded: false,

                    executionTime: 0,

                    screenshot: null,

                    consoleErrors: [],

                    networkErrors: [],

                    timestamp:
                        new Date().toISOString(),

                    components: emptyComponents

                });

            }

        }

        Logger.info("");

    }

}