export interface SearchValidationResult {

    detected: boolean;

    executed: boolean;

    passed: boolean;

    query: string;

    beforeRowCount: number;

    afterRowCount: number;

    duration: number;

    searchBoxSelector: string;

    trigger: "enter" | "button" | "auto" | "unknown";

    message: string;

}