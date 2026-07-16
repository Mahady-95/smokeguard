import { Page } from "@playwright/test";
import { NavigationItem } from "../models/NavigationItem";

export class NavigationDiscoverer {

    public static async discover(
        page: Page
    ): Promise<NavigationItem[]> {

        return await page.evaluate(() => {

            const result: NavigationItem[] = [];

            const seen = new Set<string>();

            const blacklist = [

                "logout",
                "log out",
                "sign out",
                "delete",
                "remove",
                "close",
                "cancel",
                "help",
                "privacy",
                "terms"

            ];

            const elements = document.querySelectorAll("a[href]");

            elements.forEach((element) => {

                const text = (element.textContent || "").trim();

                const href = (element as HTMLAnchorElement).href;

                if (!text || !href) {

                    return;

                }

                const lower = text.toLowerCase();

                if (blacklist.some(x => lower.includes(x))) {

                    return;

                }

                if (
                    href.startsWith("javascript:") ||
                    href.startsWith("mailto:") ||
                    href.startsWith("tel:")
                ) {

                    return;

                }

                if (seen.has(href)) {

                    return;

                }

                seen.add(href);

                result.push({

                    id: crypto.randomUUID(),

                    name: text,

                    url: href,

                    source: "link",
                    
                    score: 0

                });

            });

            return result;

        });

    }

}