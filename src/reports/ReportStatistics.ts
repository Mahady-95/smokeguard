import { ValidationResult } from "../models/ValidationResult";

export interface ReportStatistics {

    total: number;

    passed: number;

    failed: number;

    passRate: number;

    averageExecutionTime: number;

    slowPages: number;

    totalConsoleErrors: number;

    totalNetworkErrors: number;

}

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

        const slowPages =
            results.filter(
                x => x.executionTime > 3000
            ).length;

        const totalConsoleErrors =
            results.reduce(
                (sum, x) =>
                    sum + x.consoleErrors.length,
                0
            );

        const totalNetworkErrors =
            results.reduce(
                (sum, x) =>
                    sum + x.networkErrors.length,
                0
            );

        const passRate =
            total === 0
                ? 0
                : Number(
                    (
                        (passed / total) *
                        100
                    ).toFixed(1)
                );

        return {

            total,

            passed,

            failed,

            passRate,

            averageExecutionTime,

            slowPages,

            totalConsoleErrors,

            totalNetworkErrors

        };

    }

}