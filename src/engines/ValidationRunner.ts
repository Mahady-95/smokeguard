import { Page } from "@playwright/test";

import { ComponentInventory } from "../models/ComponentInventory";
import { ValidationExecutionResult } from "../models/ValidationExecutionResult";
import { ValidationTask } from "../models/ValidationTask";

import { SearchValidator } from "../validators/SearchValidator";
import { PaginationValidator } from "../validators/PaginationValidator";
import { ComponentLocatorService } from "../services/ComponentLocatorService";

export class ValidationRunner {

    public static async run(

        page: Page,

        pageName: string,

        inventory: ComponentInventory,

        tasks: ValidationTask[]

    ): Promise<ValidationExecutionResult[]> {

        const results: ValidationExecutionResult[] = [];

        for (const task of tasks) {

            const start = Date.now();

            try {

                const result =
                    await this.executeTask(

                        page,

                        inventory,

                        task

                    );

                results.push({

                    validator: task.validator,

                    page: pageName,

                    executed: true,

                    passed: result?.passed ?? false,

                    executionTime:
                        Date.now() - start,

                    result

                });

            }

            catch (error) {

                results.push({

                    validator: task.validator,

                    page: pageName,

                    executed: false,

                    passed: false,

                    executionTime:
                        Date.now() - start,

                    error:
                        error instanceof Error
                            ? error.message
                            : String(error)

                });

            }

        }

        return results;

    }
    private static async executeTask(

        page: Page,

        inventory: ComponentInventory,

        task: ValidationTask

    ): Promise<any> {

        switch (task.validator) {

            case "SearchValidator": {

                if (inventory.searchBoxes === 0) {

                    return {

                        passed: true,

                        skipped: true,

                        message: "No search box found"

                    };

                }

                const searchBox =
                    await ComponentLocatorService.getSearchBox(page);

                if (!searchBox) {

                    return {

                        passed: false,

                        skipped: true,

                        message: "Search box locator not found"

                    };

                }

                return await SearchValidator.validate(

                    page,

                    searchBox

                );

            }

            case "PaginationValidator": {

                if (inventory.paginations === 0) {

                    return {

                        passed: true,

                        skipped: true,

                        message: "No pagination found"

                    };

                }

                const nextButton =
                    await ComponentLocatorService.getNextButton(page);

                if (!nextButton) {

                    return {

                        passed: false,

                        skipped: true,

                        message: "Next button locator not found"

                    };

                }

                return await PaginationValidator.validate(

                    page,

                    nextButton

                );

            }

            default:

                return {

                    passed: true,

                    skipped: true,

                    message:
                        `Unknown validator: ${task.validator}`

                };

        }

    }

}
