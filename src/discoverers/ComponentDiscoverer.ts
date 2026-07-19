import { Page } from "@playwright/test";

import { ComponentInventory } from "../models/ComponentInventory";
import { Component } from "../models/Component";

export class ComponentDiscoverer {

    public static async discover(
        page: Page
    ): Promise<ComponentInventory> {

        return await page.evaluate(() => {

            const inputs = Array.from(
                document.querySelectorAll("input")
            );

            const elements: Component[] = [];

            document
                .querySelectorAll(
                    "button,input,select,textarea,a"
                )
                .forEach(node => {

                    const element =
                        node as HTMLElement;

                    const input =
                        node as HTMLInputElement;

                    const selector = (() => {

                        if (input.id) {

                            return `#${input.id}`;

                        }

                        if (input.name) {

                            return `[name="${input.name}"]`;

                        }

                        return node.tagName.toLowerCase();

                    })();

                    elements.push({

                        type:
                            input.type ||
                            node.tagName.toLowerCase(),

                        tag:
                            node.tagName.toLowerCase(),

                        text:
                            element.innerText?.trim() ||

                            input.value ||

                            "",

                        id:
                            input.id || "",

                        name:
                            input.name || "",

                        placeholder:
                            input.placeholder || "",

                        selector,

                        visible:
                            element.offsetParent !== null,

                        enabled:
                            !input.disabled

                    });

                });

            return {

                forms:
                    document.querySelectorAll("form").length,

                inputs:
                    inputs.length,

                buttons:
                    document.querySelectorAll(
                        "button,input[type='button'],input[type='submit']"
                    ).length,

                links:
                    document.querySelectorAll("a").length,

                tables:
                    document.querySelectorAll("table").length,

                dropdowns:
                    document.querySelectorAll("select").length,

                checkboxes:
                    document.querySelectorAll(
                        "input[type='checkbox']"
                    ).length,

                radios:
                    document.querySelectorAll(
                        "input[type='radio']"
                    ).length,

                textareas:
                    document.querySelectorAll("textarea").length,

                images:
                    document.querySelectorAll("img").length,

                fileUploads:
                    document.querySelectorAll(
                        "input[type='file']"
                    ).length,

                searchBoxes:
                    inputs.filter(input => {

                        const type =
                            input.type.toLowerCase();

                        const name =
                            (input.name || "").toLowerCase();

                        const id =
                            (input.id || "").toLowerCase();

                        const placeholder =
                            (input.placeholder || "").toLowerCase();

                        return (

                            type === "search" ||

                            name.includes("search") ||

                            id.includes("search") ||

                            placeholder.includes("search")

                        );

                    }).length,

                paginations:
                    document.querySelectorAll(
                        ".pagination,.pager,[aria-label*=pagination i]"
                    ).length,

                filters:
                    document.querySelectorAll(
                        ".filter,.filters,[data-filter]"
                    ).length,

                elements

            };

        });

    }

}