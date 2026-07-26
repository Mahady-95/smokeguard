export interface ValidationExecutionResult {

    validator: string;

    page: string;

    executed: boolean;

    passed: boolean;

    executionTime: number;

    result?: unknown;

    error?: string;

}