import { RawElement } from "../models/RawElement";
import { NavigationItem } from "../models/NavigationItem";

export class NavigationScorer {

    public static score(
        elements: RawElement[]
    ): NavigationItem[] {

        return elements
            .map((element): NavigationItem => {

                let score = 50;

                const text = element.text.toLowerCase();

                if (text.includes("dashboard")) score += 50;
                if (text.includes("home")) score += 40;
                if (text.includes("user")) score += 40;
                if (text.includes("role")) score += 35;
                if (text.includes("setting")) score += 35;
                if (text.includes("report")) score += 30;

                return {

                    id: crypto.randomUUID(),

                    name: element.text,

                    url: element.href,

                    score,

                    source: "link"

                };

            })
            .sort((a, b) => b.score - a.score);

    }

}