import { LocatorCandidate } from "./LocatorCandidate";

export interface SmartLocator {

    best: LocatorCandidate;

    candidates: LocatorCandidate[];

}