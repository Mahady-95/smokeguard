import { Locator, Page } from "@playwright/test";

import { Component } from "../models/Component";
import { SmartLocator } from "../locators/SmartLocator";

export class LocatorService {

    /**
     * Existing login/static locator support
     */
    public static async find(

        page: Page,

        locators: string[]

    ): Promise<Locator | null> {

        for (const selector of locators) {

            try {

                const locator = page.locator(selector);

                const count = await locator.count();

                for (let i = 0; i < count; i++) {

                    const candidate = locator.nth(i);

                    if (await candidate.isVisible()) {

                        return candidate;

                    }

                }

            }

            catch {

                // Ignore invalid selector

            }

        }

        return null;

    }

    /**
     * Smart login input discovery
     */
    public static async findByInputAnalysis(

        page: Page

    ): Promise<Locator | null> {

        const inputs = page.locator(

            "input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='reset'])"

        );

        const count = await inputs.count();

        let fallback: Locator | null = null;

        for (let i = 0; i < count; i++) {

            const input = inputs.nth(i);

            // Skip hidden elements
            if (!(await input.isVisible())) {

                continue;

            }

            // Remember first visible editable input
            if (!fallback) {

                fallback = input;

            }

            const type = (
                (await input.getAttribute("type")) || ""
            ).toLowerCase();

            const id = (
                (await input.getAttribute("id")) || ""
            ).toLowerCase();

            const name = (
                (await input.getAttribute("name")) || ""
            ).toLowerCase();

            const placeholder = (
                (await input.getAttribute("placeholder")) || ""
            ).toLowerCase();

            const aria = (
                (await input.getAttribute("aria-label")) || ""
            ).toLowerCase();

            const text =
                `${type} ${id} ${name} ${placeholder} ${aria}`;

            if (

                text.includes("user") ||

                text.includes("email") ||

                text.includes("login") ||

                text.includes("account")

            ) {

                return input;

            }

        }

        return fallback;

    }

    /**
     * Future AI / Smart Locator support
     */
    public static findComponent(

        page: Page,

        component: Component

    ): Locator {

        return SmartLocator.find(

            page,

            component

        );

    }

}