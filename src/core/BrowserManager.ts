import {
    Browser,
    BrowserContext,
    chromium,
    firefox,
    Page,
    webkit
} from "@playwright/test";

import { ConfigManager } from "./ConfigManager";
import { Logger } from "./Logger";

export class BrowserManager {

    private static browser: Browser | null = null;

    private static context: BrowserContext | null = null;

    private static page: Page | null = null;

    public static async launch(): Promise<void> {

        const config = ConfigManager.get();

        switch (config.browser.toLowerCase()) {

            case "firefox":

                this.browser = await firefox.launch({
                    headless: config.headless
                });

                break;

            case "webkit":

                this.browser = await webkit.launch({
                    headless: config.headless
                });

                break;

            case "chromium":

            default:

                this.browser = await chromium.launch({
                    headless: config.headless
                });

                break;

        }

        this.context = await this.browser.newContext({

            acceptDownloads: true,

            ignoreHTTPSErrors: true,

            viewport: {

                width: 1920,

                height: 1080

            }

        });

        this.page = await this.context.newPage();

        this.page.setDefaultTimeout(config.timeout);

    }

    public static getBrowser(): Browser {

        if (!this.browser) {

            throw new Error("Browser has not been launched.");

        }

        return this.browser;

    }

    public static getContext(): BrowserContext {

        if (!this.context) {

            throw new Error("Browser context has not been created.");

        }

        return this.context;

    }

    public static getPage(): Page {

        if (!this.page) {

            throw new Error("Page has not been created.");

        }

        return this.page;

    }

    public static isRunning(): boolean {

        return this.browser !== null;

    }

    public static async close(): Promise<void> {

        try {

            if (this.page) {

                await this.page.close();

                this.page = null;

            }

            if (this.context) {

                await this.context.close();

                this.context = null;

            }

            if (this.browser) {

                await this.browser.close();

                this.browser = null;

            }

        }

        catch (error) {

            Logger.warn(

                error instanceof Error
                    ? error.message
                    : String(error)

            );

        }

    }

}