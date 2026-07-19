import { ValidationResult } from "../models/ValidationResult";

export class ResultManager {

    private static results: ValidationResult[] = [];

    public static clear(): void {

        this.results = [];

    }

    public static add(
        result: ValidationResult
    ): void {

        this.results.push(result);

    }

    public static getAll(): ValidationResult[] {

        return [...this.results];

    }

    public static passed(): number {

        return this.results.filter(
            result => result.passed
        ).length;

    }

    public static failed(): number {

        return this.results.filter(
            result => !result.passed
        ).length;

    }

    public static total(): number {

        return this.results.length;

    }

}