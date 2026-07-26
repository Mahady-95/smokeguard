import { Locator, Page } from "@playwright/test";

import { SearchValidationResult } from "../models/SearchValidationResult";

import { SearchService } from "../services/SearchService";

import { SnapshotAnalyzer } from "../analyzers/SnapshotAnalyzer";
import { IValidator } from "./IValidator";
import { ValidationContext } from "../models/ValidationContext";

export class SearchValidator
implements IValidator<SearchValidationResult> {

    public static async validate(

        page: Page,

        searchBox: Locator

    ): Promise<SearchValidationResult> {

        const selector =
            await this.getSelector(searchBox);

        const query =
            await this.generateQuery(searchBox);

        try {

            const execution =
                await SearchService.execute(

                    page,

                    searchBox,

                    query

                );

            const analysis =
                SnapshotAnalyzer.compare(

                    execution.before,

                    execution.after

                );

            return {

                detected: true,

                executed: true,

                passed: analysis.passed,

                query: execution.query,

                beforeRowCount:
                    execution.before.rowCount,

                afterRowCount:
                    execution.after.rowCount,

                duration:
                    execution.duration,

                searchBoxSelector:
                    selector,

                trigger:
                    execution.trigger,

                message:
                    analysis.message

            };

        }

        catch (error) {

            return {

                detected: true,

                executed: false,

                passed: false,

                query,

                beforeRowCount: 0,

                afterRowCount: 0,

                duration: 0,

                searchBoxSelector: selector,

                trigger: "unknown",

                message:
                    error instanceof Error
                        ? error.message
                        : String(error)

            };

        }

    }

    private static async generateQuery(

        locator: Locator

    ): Promise<string> {

        const placeholder = (

            await locator.getAttribute("placeholder")

            || ""

        ).toLowerCase();

        const name = (

            await locator.getAttribute("name")

            || ""

        ).toLowerCase();

        const aria = (

            await locator.getAttribute("aria-label")

            || ""

        ).toLowerCase();

        const id = (

            await locator.getAttribute("id")

            || ""

        ).toLowerCase();

        const text =
            `${placeholder} ${name} ${aria} ${id}`;

        if (text.includes("vessel")) {

            return "MV";

        }

        if (text.includes("crew")) {

            return "Ahmed";

        }

        if (text.includes("port")) {

            return "Dhaka";

        }

        if (text.includes("organization")) {

            return "Shipping";

        }

        if (text.includes("agent")) {

            return "Agent";

        }

        if (text.includes("user")) {

            return "Admin";

        }

        if (text.includes("email")) {

            return "@";

        }

        if (text.includes("phone")) {

            return "017";

        }

        return "test";

    }

    private static async getSelector(

        locator: Locator

    ): Promise<string> {

        const id =
            await locator.getAttribute("id");

        if (id) {

            return `#${id}`;

        }

        const name =
            await locator.getAttribute("name");

        if (name) {

            return `[name="${name}"]`;

        }

        const placeholder =
            await locator.getAttribute("placeholder");

        if (placeholder) {

            return `[placeholder="${placeholder}"]`;

        }

        const aria =
            await locator.getAttribute("aria-label");

        if (aria) {

            return `[aria-label="${aria}"]`;

        }

        return "Unknown";

    }

}