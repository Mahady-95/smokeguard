import { Page } from "@playwright/test";
import { RawElement } from "../models/RawElement";

export class DOMDiscoverer {

    public static async discover(
        page: Page
    ): Promise<RawElement[]> {

        return await page.evaluate(() => {

            const result: RawElement[] = [];

            const elements = document.querySelectorAll(
                "a[href],button,[role='button']"
            );

            elements.forEach(element => {

                const text =
                    element.textContent?.trim() ?? "";

                const href =
                    element instanceof HTMLAnchorElement
                        ? element.href
                        : "";

                result.push({

                    text,

                    href,

                    tag: element.tagName,

                    visible:
                        element instanceof HTMLElement
                            ? element.offsetParent !== null
                            : true,

                    enabled:
                        !(element as HTMLButtonElement).disabled,

                    depth: 0

                });

            });

            return result;

        });

    }

}