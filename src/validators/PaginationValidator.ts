import { Locator, Page } from "@playwright/test";

import { PaginationValidationResult } from "../models/PaginationValidationResult";

import { PaginationService } from "../services/PaginationService";

import { SnapshotAnalyzer } from "../analyzers/SnapshotAnalyzer";

export class PaginationValidator {

    public static async validate(

        page: Page,

        nextButton: Locator,

        previousButton?: Locator,

        pageSizeDropdown?: Locator

    ): Promise<PaginationValidationResult> {

        try {

            const nextResult =

                await PaginationService.goNext(

                    page,

                    nextButton

                );

            const nextAnalysis =

                SnapshotAnalyzer.compare(

                    nextResult.before,

                    nextResult.after

                );

            let previousWorked = false;

            if (previousButton) {

                const previousResult =

                    await PaginationService.goPrevious(

                        page,

                        previousButton

                    );

                const previousAnalysis =

                    SnapshotAnalyzer.compare(

                        previousResult.before,

                        previousResult.after

                    );

                previousWorked =

                    previousAnalysis.passed;

            }

            let pageSizeChanged = false;

            if (pageSizeDropdown) {

                const pageSizeResult =

                    await PaginationService.changePageSize(

                        page,

                        pageSizeDropdown,

                        "25"

                    );

                const pageSizeAnalysis =

                    SnapshotAnalyzer.compare(

                        pageSizeResult.before,

                        pageSizeResult.after

                    );

                pageSizeChanged =

                    pageSizeAnalysis.passed;

            }

            return {

                detected: true,

                executed: true,

                passed:

                    nextAnalysis.passed,

                currentPage: 0,

                totalPages: 0,

                nextWorked:

                    nextAnalysis.passed,

                previousWorked,

                pageSizeChanged,

                beforeRowCount:

                    nextResult.before.rowCount,

                afterRowCount:

                    nextResult.after.rowCount,

                duration:

                    nextResult.duration,

                message:

                    nextAnalysis.message

            };

        }

        catch (error) {

            return {

                detected: true,

                executed: false,

                passed: false,

                currentPage: 0,

                totalPages: 0,

                nextWorked: false,

                previousWorked: false,

                pageSizeChanged: false,

                beforeRowCount: 0,

                afterRowCount: 0,

                duration: 0,

                message:

                    error instanceof Error

                        ? error.message

                        : String(error)

            };

        }

    }

}