import { LocatorStrategy } from "../locator/LocatorStrategy";

export interface SmartLocatorResult {

    strategy: LocatorStrategy;

    value: string;

    selector: string;

    confidence: number;

}