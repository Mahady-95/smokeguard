import { Logger } from "../core/Logger";
import { ResultManager } from "../core/ResultManager";

export class ConsoleReport {

    public static generate(): void {

        const results = ResultManager.getAll();

        Logger.info("");
        Logger.info("============= SmokeGuard Report =============");

        Logger.info(`Total Pages : ${ResultManager.total()}`);
        Logger.info(`Passed      : ${ResultManager.passed()}`);
        Logger.info(`Failed      : ${ResultManager.failed()}`);

        Logger.info("");

        results.forEach(result => {

            Logger.info(
                `${result.passed ? "✅" : "❌"} ${result.pageName} (${result.executionTime} ms)`
            );

            // -----------------------------
            // Component Validation Summary
            // -----------------------------

            const totalComponents =
                result.components.elements.length;

            const validatedComponents =
                result.components.elements.filter(
                    component => component.validated
                ).length;

            const failedComponents =
                totalComponents - validatedComponents;

            Logger.info(
                `   Components : ${validatedComponents}/${totalComponents}`
            );

            if (failedComponents > 0) {

                Logger.warn(
                    `   Failed Components : ${failedComponents}`
                );

                result.components.elements
                    .filter(component => !component.validated)
                    .forEach(component => {

                        Logger.warn(
                            `      • ${component.tag} (${component.selector})`
                        );

                    });

            }

            // -----------------------------
            // Existing Error Reporting
            // -----------------------------

            if (!result.passed) {

                if (result.consoleErrors.length > 0) {

                    Logger.warn("   Console:");

                    result.consoleErrors.forEach(error =>

                        Logger.warn(`      • ${error}`)

                    );

                }

                if (result.networkErrors.length > 0) {

                    Logger.warn("   Network:");

                    result.networkErrors.forEach(error =>

                        Logger.warn(`      • ${error}`)

                    );

                }

                if (result.screenshot) {

                    Logger.info(
                        `   Screenshot : ${result.screenshot}`
                    );

                }

            }

            Logger.info("");

        });

        Logger.info("=============================================");
        Logger.info("");

    }

}