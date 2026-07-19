export interface ValidationResult {

    pageName: string;

    url: string;

    passed: boolean;

    pageLoaded: boolean;

    consoleErrors: string[];

    networkErrors: string[];

}