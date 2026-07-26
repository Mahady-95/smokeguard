export interface ReportStatistics {

    total: number;

    passed: number;

    failed: number;

    passRate: number;

    averageExecutionTime: number;

    fastestPage: string;

    slowestPage: string;

    slowPages: number;

    totalExecutionTime: number;

    totalConsoleErrors: number;

    totalNetworkErrors: number;

    totalButtons: number;

    totalInputs: number;

    totalTables: number;

    totalDropdowns: number;

    totalCheckboxes: number;

    totalRadios: number;

    totalTextareas: number;

    totalImages: number;

    totalFileUploads: number;

    totalSearchBoxes: number;

    totalPaginations: number;

    totalFilters: number;

}

import { ValidationResult } from "../models/ValidationResult";

export class ReportStatisticsBuilder {

    public static build(

        results: ValidationResult[]

    ): ReportStatistics {

        const total = results.length;

        const passed =
            results.filter(
                x => x.passed
            ).length;

        const failed =
            total - passed;

        const passRate =
            total === 0
                ? 0
                : Number(
                    (
                        passed / total * 100
                    ).toFixed(1)
                );

        const totalExecutionTime =
            results.reduce(

                (sum, x) =>

                    sum + x.executionTime,

                0

            );

        const averageExecutionTime =
            total === 0
                ? 0
                : Math.round(
                    totalExecutionTime / total
                );

        const fastest =
            results.length > 0
                ? [...results].sort(
                    (a, b) =>
                        a.executionTime -
                        b.executionTime
                )[0]
                : null;

        const slowest =
            results.length > 0
                ? [...results].sort(
                    (a, b) =>
                        b.executionTime -
                        a.executionTime
                )[0]
                : null;

        const slowPages =
            results.filter(
                x => x.executionTime > 3000
            ).length;

        const totalConsoleErrors =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.consoleErrors.length,

                0

            );

        const totalNetworkErrors =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.networkErrors.length,

                0

            );

        const totalButtons =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.buttons,

                0

            );

        const totalInputs =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.inputs,

                0

            );

        const totalTables =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.tables,

                0

            );

        const totalDropdowns =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.dropdowns,

                0

            );

        const totalCheckboxes =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.checkboxes,

                0

            );

        const totalRadios =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.radios,

                0

            );

        const totalTextareas =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.textareas,

                0

            );

        const totalImages =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.images,

                0

            );

        const totalFileUploads =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.fileUploads,

                0

            );

        const totalSearchBoxes =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.searchBoxes,

                0

            );

        const totalPaginations =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.paginations,

                0

            );

        const totalFilters =
            results.reduce(

                (sum, x) =>

                    sum +
                    x.components.filters,

                0

            );

        return {

            total,

            passed,

            failed,

            passRate,

            averageExecutionTime,

            fastestPage:
                fastest?.pageName ?? "-",

            slowestPage:
                slowest?.pageName ?? "-",

            slowPages,

            totalExecutionTime,

            totalConsoleErrors,

            totalNetworkErrors,

            totalButtons,

            totalInputs,

            totalTables,

            totalDropdowns,

            totalCheckboxes,

            totalRadios,

            totalTextareas,

            totalImages,

            totalFileUploads,

            totalSearchBoxes,

            totalPaginations,

            totalFilters

        };

    }

}