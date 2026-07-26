import { Locator, Page } from "@playwright/test";

export class ComponentLocatorService {

    public static async getSearchBox(

        page: Page

    ): Promise<Locator | null> {

        const selectors = [

            "input[type='search']",

            "input[placeholder*='Search' i]",

            "input[placeholder*='search' i]",

            "input[name*='search' i]",

            "input[id*='search' i]",

            "input[aria-label*='search' i]"

        ];

        for (const selector of selectors) {

            const locator = page.locator(selector).first();

            if (await locator.count() > 0) {

                return locator;

            }

        }

        return null;

    }
    public static async getPagination(

        page: Page

    ): Promise<Locator | null> {

        const selectors = [

            ".pagination",

            "nav[aria-label*='pagination' i]",

            "ul.pagination",

            "[class*='pagination' i]",

            "[data-testid*='pagination' i]"

        ];

        for (const selector of selectors) {

            const locator = page.locator(selector).first();

            if (await locator.count() > 0) {

                return locator;

            }

        }

        return null;

    }
    public static async getNextButton(

        page: Page

    ): Promise<Locator | null> {

        const pagination = await this.getPagination(page);

        if (!pagination) {

            return null;

        }

        const selectors = [

            ".next",

            "[aria-label*='next' i]",

            ".ant-pagination-next",

            "button.next",

            "li:last-child a",

            ".MuiTablePagination-actions button:last-child"

        ];

        for (const selector of selectors) {

            const locator = pagination.locator(selector).first();

            if (await locator.count() > 0) {

                return locator;

            }

        }

        return null;

    }
    public static async getDropdowns(

        page: Page

    ): Promise<Locator[]> {

        return await page.locator("select").all();

    }
    public static async getCheckboxes(

        page: Page

    ): Promise<Locator[]> {

        return await page.locator("input[type='checkbox']").all();

    }
    public static async getRadios(

        page: Page

    ): Promise<Locator[]> {

        return await page.locator("input[type='radio']").all();

    }
    public static async getTables(

        page: Page

    ): Promise<Locator[]> {

        return await page.locator("table").all();

    }
}