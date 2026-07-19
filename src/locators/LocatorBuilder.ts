import { Component } from "../models/Component";
import { LocatorCandidate } from "../models/LocatorCandidate";
import { SmartLocator } from "../models/SmartLocator";

export class LocatorBuilder {

    public static build(

        component: Component

    ): SmartLocator {

        const candidates: LocatorCandidate[] = [];

        if (component.id) {

            candidates.push({

                selector: `#${component.id}`,

                strategy: "id",

                confidence: 100

            });

        }

        if (component.name) {

            candidates.push({

                selector:

                    `[name="${component.name}"]`,

                strategy: "name",

                confidence: 95

            });

        }

        if (component.placeholder) {

            candidates.push({

                selector:

                    `[placeholder="${component.placeholder}"]`,

                strategy: "placeholder",

                confidence: 90

            });

        }

        if (component.tag) {

            candidates.push({

                selector:

                    component.tag,

                strategy: "tag",

                confidence: 25

            });

        }

        candidates.sort(

            (a, b) =>

                b.confidence - a.confidence

        );

        return {

            best: candidates[0],

            candidates

        };

    }

}