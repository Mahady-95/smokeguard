import { Locator, Page } from "@playwright/test";

import { PageSnapshot } from "../models/PageSnapshot";
import { PageSnapshotService } from "./PageSnapshotService";

export interface PaginationExecutionResult {

    before: PageSnapshot;

    after: PageSnapshot;

    duration: number;

    action: "next" | "previous" | "pageSize";

}

export class PaginationService {

    public static async goNext(

        page: Page,

        nextButton: Locator

    ): Promise<PaginationExecutionResult> {

        const before =
            await PageSnapshotService.capture(page);

        const started =
            Date.now();

        await nextButton.click();

        await this.waitForPagination(page);

        const after =
            await PageSnapshotService.capture(page);

        return {

            before,

            after,

            duration:
                Date.now() - started,

            action: "next"

        };

    }

    public static async goPrevious(

        page: Page,

        previousButton: Locator

    ): Promise<PaginationExecutionResult> {

        const before =
            await PageSnapshotService.capture(page);

        const started =
            Date.now();

        await previousButton.click();

        await this.waitForPagination(page);

        const after =
            await PageSnapshotService.capture(page);

        return {

            before,

            after,

            duration:
                Date.now() - started,

            action: "previous"

        };

    }

    public static async changePageSize(

        page: Page,

        pageSizeDropdown: Locator,

        value: string

    ): Promise<PaginationExecutionResult> {

        const before =
            await PageSnapshotService.capture(page);

        const started =
            Date.now();

        await pageSizeDropdown.selectOption(value);

        await this.waitForPagination(page);

        const after =
            await PageSnapshotService.capture(page);

        return {

            before,

            after,

            duration:
                Date.now() - started,

            action: "pageSize"

        };

    }

    private static async waitForPagination(

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