import { Page } from "@playwright/test";
import { PageInfo } from "../models/PageInfo";

export class NavigationService {

    public static async discover(page: Page): Promise<PageInfo[]> {

        const links = page.locator("a[href]");

        const count = await links.count();

        const pages: PageInfo[] = [];

        const visited = new Set<string>();

        for (let i = 0; i < count; i++) {

            const link = links.nth(i);

            const title = (await link.innerText()).trim();

            const href = await link.getAttribute("href");

            if (!href) {

                continue;

            }

            if (
                href.startsWith("#") ||
                href.startsWith("javascript:")
            ) {

                continue;

            }

            if (visited.has(href)) {

                continue;

            }

            visited.add(href);

            pages.push({

                title: title || href,

                url: href

            });

        }

        return pages;

    }

}