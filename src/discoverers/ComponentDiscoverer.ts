import { Page } from "@playwright/test";

import { ComponentInventory } from "../models/ComponentInventory";

export class ComponentDiscoverer {

    public static async discover(
        page: Page
    ): Promise<ComponentInventory> {

        return await page.evaluate(() => {

            const getRole = (
                node: HTMLElement,
                tag: string
            ): string => {

                const explicitRole =
                    node.getAttribute("role");

                if (explicitRole) {

                    return explicitRole;

                }

                if (tag === "button") {

                    return "button";

                }

                if (tag === "a") {

                    return "link";

                }

                if (tag === "select") {

                    return "combobox";

                }

                if (tag === "textarea") {

                    return "textbox";

                }

                if (tag === "input") {

                    const type =
                        (
                            node.getAttribute("type") ||
                            "text"
                        ).toLowerCase();

                    if (
                        type === "checkbox"
                    ) {

                        return "checkbox";

                    }

                    if (
                        type === "radio"
                    ) {

                        return "radio";

                    }

                    if (
                        type === "button" ||
                        type === "submit" ||
                        type === "reset"
                    ) {

                        return "button";

                    }

                    return "textbox";

                }

                return "";

            };

            const getLabel = (
                node: HTMLElement,
                id: string
            ): string => {

                if (id) {

                    const escapedId =
                        id.replace(
                            /(["\\])/g,
                            "\\$1"
                        );

                    const explicitLabel =
                        document.querySelector<HTMLLabelElement>(
                            `label[for="${escapedId}"]`
                        );

                    if (explicitLabel) {

                        return (
                            explicitLabel.innerText ||
                            explicitLabel.textContent ||
                            ""
                        ).trim();

                    }

                }

                const parentLabel =
                    node.closest("label");

                if (parentLabel) {

                    return (
                        parentLabel.innerText ||
                        parentLabel.textContent ||
                        ""
                    ).trim();

                }

                return "";

            };

            const isVisible = (
                node: HTMLElement
            ): boolean => {

                const style =
                    window.getComputedStyle(node);

                const rectangle =
                    node.getBoundingClientRect();

                return (

                    style.display !== "none" &&

                    style.visibility !== "hidden" &&

                    Number(style.opacity) > 0 &&

                    rectangle.width > 0 &&

                    rectangle.height > 0

                );

            };

            const escapeCss = (
                value: string
            ): string => {

                if (
                    typeof CSS !== "undefined" &&
                    typeof CSS.escape === "function"
                ) {

                    return CSS.escape(value);

                }

                return value.replace(
                    /([ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g,
                    "\\$1"
                );

            };

            const escapeAttribute = (
                value: string
            ): string => {

                return value
                    .replace(/\\/g, "\\\\")
                    .replace(/"/g, '\\"');

            };

            const buildSelector = (
                node: HTMLElement,
                tag: string,
                id: string,
                name: string,
                testId: string
            ): string => {

                if (testId) {

                    return `[data-testid="${escapeAttribute(testId)}"]`;

                }

                if (id) {

                    return `#${escapeCss(id)}`;

                }

                if (name) {

                    return `${tag}[name="${escapeAttribute(name)}"]`;

                }

                const parent =
                    node.parentElement;

                if (!parent) {

                    return tag;

                }

                const sameTagElements =
                    Array.from(
                        parent.children
                    ).filter(child =>

                        child.tagName.toLowerCase() ===
                        tag

                    );

                if (
                    sameTagElements.length === 1
                ) {

                    return tag;

                }

                const index =
                    sameTagElements.indexOf(node) + 1;

                return `${tag}:nth-of-type(${index})`;

            };

            const inputElements =
                Array.from(
                    document.querySelectorAll<HTMLInputElement>(
                        "input"
                    )
                );

            const discoveredElements =
                Array.from(
                    document.querySelectorAll<HTMLElement>(
                        "button,input,select,textarea,a"
                    )
                );

            const elements =
                discoveredElements.map(node => {

                    const tag =
                        node.tagName.toLowerCase();

                    const id =
                        node.getAttribute("id") || "";

                    const name =
                        node.getAttribute("name") || "";

                    const placeholder =
                        node.getAttribute(
                            "placeholder"
                        ) || "";

                    const ariaLabel =
                        node.getAttribute(
                            "aria-label"
                        ) || "";

                    const role =
                        getRole(
                            node,
                            tag
                        );

                    const label =
                        getLabel(
                            node,
                            id
                        );

                    const testId =
                        node.getAttribute(
                            "data-testid"
                        ) ||
                        node.getAttribute(
                            "data-test-id"
                        ) ||
                        node.getAttribute(
                            "data-test"
                        ) ||
                        "";

                    const text =
                        (
                            node.innerText ||
                            node.getAttribute(
                                "value"
                            ) ||
                            ""
                        ).trim();

                    const type =
                        node.getAttribute(
                            "type"
                        ) ||
                        role ||
                        tag;

                    const selector =
                        buildSelector(
                            node,
                            tag,
                            id,
                            name,
                            testId
                        );

                    const visible =
                        isVisible(node);

                    const disabled =
                        node.hasAttribute(
                            "disabled"
                        );

                    const ariaDisabled =
                        node.getAttribute(
                            "aria-disabled"
                        ) === "true";

                    return {

                        type,

                        tag,

                        text,

                        id,

                        name,

                        placeholder,

                        ariaLabel,

                        role,

                        label,

                        testId,

                        selector,

                        visible,

                        enabled:
                            !disabled &&
                            !ariaDisabled

                    };

                });

            return {

                forms:
                    document.querySelectorAll(
                        "form"
                    ).length,

                inputs:
                    inputElements.length,

                buttons:
                    document.querySelectorAll(
                        "button,input[type='button'],input[type='submit'],input[type='reset']"
                    ).length,

                links:
                    document.querySelectorAll(
                        "a"
                    ).length,

                tables:
                    document.querySelectorAll(
                        "table"
                    ).length,

                dropdowns:
                    document.querySelectorAll(
                        "select"
                    ).length,

                checkboxes:
                    document.querySelectorAll(
                        "input[type='checkbox']"
                    ).length,

                radios:
                    document.querySelectorAll(
                        "input[type='radio']"
                    ).length,

                textareas:
                    document.querySelectorAll(
                        "textarea"
                    ).length,

                images:
                    document.querySelectorAll(
                        "img"
                    ).length,

                fileUploads:
                    document.querySelectorAll(
                        "input[type='file']"
                    ).length,

                searchBoxes:
                    inputElements.filter(input => {

                        const values = [

                            input.type,

                            input.name,

                            input.id,

                            input.placeholder,

                            input.getAttribute(
                                "aria-label"
                            ) || ""

                        ].map(value =>

                            (
                                value ||
                                ""
                            ).toLowerCase()

                        );

                        return (

                            values[0] ===
                            "search" ||

                            values.some(value =>

                                value.includes(
                                    "search"
                                )

                            )

                        );

                    }).length,

                paginations:
                    document.querySelectorAll(
                        ".pagination,.pager,[aria-label*='pagination' i]"
                    ).length,

                filters:
                    document.querySelectorAll(
                        ".filter,.filters,[data-filter],[aria-label*='filter' i]"
                    ).length,

                elements

            };

        });

    }

}