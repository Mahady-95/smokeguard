import { Page } from "@playwright/test";

import { ComponentInventory } from "./ComponentInventory";

export interface ValidationContext {

    page: Page;

    inventory: ComponentInventory;

}