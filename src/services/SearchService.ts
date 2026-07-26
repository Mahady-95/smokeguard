import { Locator, Page } from "@playwright/test";

import { PageSnapshot } from "../models/PageSnapshot";
import { PageSnapshotService } from "./PageSnapshotService";

export interface SearchExecutionResult {

    before: PageSnapshot;

    after: PageSnapshot;

    query: string;

    duration: number;

    trigger: "enter" | "button" | "auto" | "unknown";

}

export class SearchService {

    public static async execute(

        page: Page,

        searchBox: Locator,

        query: string

    ): Promise<SearchExecutionResult> {

        const before =
            await PageSnapshotService.capture(
                page,
                searchBox
            );

        const started =
            Date.now();

        await searchBox.click();

        await searchBox.fill("");

        await searchBox.fill(query);

        const trigger =
            await this.triggerSearch(
                page,
                searchBox
            );

        await this.waitForSearch(page);

        const after =
            await PageSnapshotService.capture(
                page,
                searchBox
            );

        return {

            before,

            after,

            query,

            duration:
                Date.now() - started,

            trigger

        };

    }

    private static async triggerSearch(

        page: Page,

        searchBox: Locator

    ): Promise<
        "enter" |
        "button" |
        "auto" |
        "unknown"
    > {

        await searchBox.press("Enter");

        await page.waitForTimeout(500);

        if (

            page.url() !== ""

        ) {

            return "enter";

        }

        const buttons = [

            "button[type='submit']",

            "button:has-text('Search' i)",

            "button:has-text('Filter' i)",

            "button:has-text('Find' i)",

            "input[type='submit']",

            "button i.fa-search",

            "button i.fas.fa-search",

            "button svg",

            ".search-btn",

            "[aria-label*='search' i]"

        ];

        for (const selector of buttons) {

            try {

                const button =
                    page.locator(selector).first();

                if (

                    await button.count() > 0 &&

                    await button.isVisible()

                ) {

                    await button.click();

                    return "button";

                }

            }

            catch {

            }

        }

        return "auto";

    }

    private static async waitForSearch(

        page: Page

    ): Promise<void> {

        try {

            await page.waitForLoadState(

                "networkidle",

                {

                    timeout: 5000

                }

            );

        }

        catch {

        }

        await page.waitForTimeout(1000);

    }

}