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

            const locator = page.locator(selector).first();

            try {

                if (await locator.count() > 0) {

                    return locator;

                }

            }

            catch {

                // Ignore invalid selector

            }

        }

        return null;

    }
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

        // Remember first editable input
        if (!fallback) {

            fallback = input;

        }

        // Username detection
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

        return SmartLocator.find(page, component);

    }

}