import { Page } from "@playwright/test";

import { ComponentDiscoverer } from "../discoverers/ComponentDiscoverer";
import { ComponentInventory } from "../models/ComponentInventory";

export class ComponentService {

    public static async discover(

        page: Page

    ): Promise<ComponentInventory> {

        return await ComponentDiscoverer.discover(page);

    }

}