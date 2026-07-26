import { Locator, Page } from "@playwright/test";

import { PageSnapshot } from "../models/PageSnapshot";

export class PageSnapshotService {

    public static async capture(

        page: Page,

        searchBox?: Locator

    ): Promise<PageSnapshot> {

        const title =

            await page.title();

        const url =

            page.url();

        const rowCount =

            await this.getRowCount(page);

        const pageText =

            await this.getVisibleText(page);

        const loadingVisible =

            await this.loadingExists(page);

        const noDataVisible =

            await this.noDataExists(page);

        const paginationVisible =

            await this.paginationExists(page);

        let searchValue = "";

        if (searchBox) {

            try {

                searchValue =

                    await searchBox.inputValue();

            }

            catch {

                searchValue = "";

            }

        }

        return {

            timestamp:

                Date.now(),

            title,

            url,

            rowCount,

            pageText,

            loadingVisible,

            noDataVisible,

            paginationVisible,

            searchValue

        };

    }

    private static async getRowCount(

        page: Page

    ): Promise<number> {

        const selectors = [

            "table tbody tr",

            ".table tbody tr",

            ".datatable tbody tr",

            ".ant-table-row",

            ".MuiTableBody-root tr",

            "[role='row']",

            ".ag-row",

            ".rt-tr-group",

            ".p-datatable-tbody > tr"

        ];

        for (const selector of selectors) {

            try {

                const count =

                    await page

                        .locator(selector)

                        .count();

                if (count > 0) {

                    return count;

                }

            }

            catch {

            }

        }

        return 0;

    }

    private static async getVisibleText(

        page: Page

    ): Promise<string> {

        try {

            const body =

                page.locator("body");

            const text =

                await body.innerText();

            return text

                .replace(/\s+/g, " ")

                .trim()

                .substring(0, 5000);

        }

        catch {

            return "";

        }

    }

    private static async loadingExists(

        page: Page

    ): Promise<boolean> {

        const selectors = [

            ".loading",

            ".spinner",

            ".loader",

            ".ant-spin",

            ".MuiCircularProgress-root",

            "[role='progressbar']"

        ];

        for (const selector of selectors) {

            try {

                if (

                    await page

                        .locator(selector)

                        .first()

                        .isVisible()

                ) {

                    return true;

                }

            }

            catch {

            }

        }

        return false;

    }

    private static async noDataExists(

        page: Page

    ): Promise<boolean> {

        const body =

            await page.locator("body")

                .innerText();

        const text =

            body.toLowerCase();

        return (

            text.includes("no data") ||

            text.includes("no records") ||

            text.includes("not found") ||

            text.includes("nothing found") ||

            text.includes("0 results")

        );

    }

    private static async paginationExists(

        page: Page

    ): Promise<boolean> {

        const selectors = [

            ".pagination",

            ".ant-pagination",

            ".MuiTablePagination-root",

            "[aria-label='pagination']"

        ];

        for (const selector of selectors) {

            try {

                if (

                    await page

                        .locator(selector)

                        .count() > 0

                ) {

                    return true;

                }

            }

            catch {

            }

        }

        return false;

    }

}