import { Page } from "@playwright/test";

export class PageLoadValidator {

    public static async validate(
        page: Page
    ): Promise<boolean> {

        try {

            await page.waitForLoadState(
                "domcontentloaded",
                {
                    timeout: 10000
                }
            );

            return true;

        }

        catch {

            return false;

        }

    }

}