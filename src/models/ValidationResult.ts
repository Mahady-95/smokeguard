import { ComponentInventory } from "./ComponentInventory";
import { ValidationExecutionResult } from "./ValidationExecutionResult";
import { PageReadyResult } from "./PageReadyResult";

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

    validations: ValidationExecutionResult[];

    pageReady: PageReadyResult;

}