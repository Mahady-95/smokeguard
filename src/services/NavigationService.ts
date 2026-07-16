import { Page } from "@playwright/test";

export class NavigationService {

    public static async waitUntilReady(page: Page): Promise<void> {

        try {

            await page.waitForLoadState("domcontentloaded", {
                timeout: 10000
            });

        } catch {}

        try {

            await page.waitForLoadState("networkidle", {
                timeout: 10000
            });

        } catch {}

        await page.waitForTimeout(1000);

    }

}