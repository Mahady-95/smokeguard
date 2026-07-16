import { Locator, Page } from "@playwright/test";

export class LocatorService {

    public static async find(
        page: Page,
        selectors: string[]
    ): Promise<Locator | null> {

        for (const selector of selectors) {

            try {

                const locator = page.locator(selector).first();

                if (await locator.isVisible()) {

                    return locator;

                }

            }
            catch {
                // Ignore invalid selector
            }

        }

        return null;

    }

    public static async findByInputAnalysis(
        page: Page
    ): Promise<Locator | null> {

        const inputs = page.locator("input");

        const count = await inputs.count();

        for (let i = 0; i < count; i++) {

            const input = inputs.nth(i);

            const type =
                (await input.getAttribute("type")) ?? "text";

            const name =
                ((await input.getAttribute("name")) ?? "").toLowerCase();

            if (type === "hidden") {

                continue;

            }

            if (
                type === "text" ||
                type === "email" ||
                name.includes("user") ||
                name.includes("login") ||
                name.includes("uid")
            ) {

                return input;

            }

        }

        return null;

    }

}