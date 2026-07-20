import { Page } from "@playwright/test";

import { Component } from "../models/Component";
import { LocatorService } from "../services/LocatorService";
import { LocatorBuilder } from "../locators/LocatorBuilder";

export class ComponentValidator {

    public static async validate(

        page: Page,

        component: Component

    ): Promise<Component> {

        try {

            const locator =
                LocatorService.findComponent(
                    page,
                    component
                );

            const exists =
                await locator.count() > 0;

            const visible =
                exists
                    ? await locator.first().isVisible()
                    : false;

            component.validated =
                exists && visible;

            // Save the generated locator
            component.locator =
                LocatorBuilder.build(component);

        }

        catch {

            component.validated = false;

            component.locator = "";

        }

        return component;

    }

}