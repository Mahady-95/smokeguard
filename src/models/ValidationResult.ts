import { ComponentInventory } from "./ComponentInventory";

export interface ValidationResult {

    pageName: string;

    url: string;

    passed: boolean;

    pageLoaded: boolean;

    executionTime: number;

    screenshot: string | null;

    consoleErrors: string[];

    networkErrors: string[];

    timestamp: string;

    components: ComponentInventory;

}