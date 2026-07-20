import { Locator, Page } from "@playwright/test";

import { Component } from "../models/Component";

import { LocatorBuilder } from "./LocatorBuilder";

export class SmartLocator {

    public static find(

        page: Page,

        component: Component

    ): Locator {

        const selector =

            LocatorBuilder.build(component);

        return page.locator(selector);

    }

}