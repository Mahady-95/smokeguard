import { Page } from "@playwright/test";

import { PageReadyResult } from "../models/PageReadyResult";

export class PageReadyService {

    public static async wait(

        page: Page

    ): Promise<PageReadyResult> {

        const started = Date.now();

        try {

            await page.waitForLoadState(

                "domcontentloaded"

            );

            await page.waitForLoadState(

                "networkidle"

            );

            await this.waitForSpinners(page);

            await this.waitForDomStability(page);

            return {

                ready: true,

                duration:
                    Date.now() - started,

                domReady: true,

                networkIdle: true,

                spinnerVisible: false

            };

        }

        catch (error) {

            return {

                ready: false,

                duration:
                    Date.now() - started,

                domReady: true,

                networkIdle: false,

                spinnerVisible: true,

                reason:

                    error instanceof Error

                        ? error.message

                        : String(error)

            };

        }

    }

    private static async waitForSpinners(

        page: Page

    ): Promise<void> {

        const selectors = [

            ".spinner",

            ".spinner-border",

            ".loading",

            ".loader",

            ".overlay",

            ".preloader",

            ".progress"

        ];

        for (const selector of selectors) {

            try {

                await page

                    .locator(selector)

                    .first()

                    .waitFor({

                        state: "hidden",

                        timeout: 500

                    });

            }

            catch {

                // Ignore if selector
                // does not exist.

            }

        }

    }

    private static async waitForDomStability(

        page: Page

    ): Promise<void> {

        await page.waitForTimeout(500);

    }

}