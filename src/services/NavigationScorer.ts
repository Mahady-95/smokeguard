import { NavigationItem } from "../models/NavigationItem";

export class NavigationScorer {

    public static score(
        items: NavigationItem[]
    ): NavigationItem[] {

        for (const item of items) {

            let score = 50;

            const name = item.name.toLowerCase();

            if (name.includes("dashboard")) score += 50;
            if (name.includes("home")) score += 40;
            if (name.includes("user")) score += 40;
            if (name.includes("role")) score += 40;
            if (name.includes("setting")) score += 35;
            if (name.includes("report")) score += 35;
            if (name.includes("master")) score += 30;

            item.score = score;

        }

        return items.sort(
            (a, b) => b.score - a.score
        );

    }

}