import { RawElement } from "../models/RawElement";

export class ElementFilter {

    private static readonly blacklist = [

        "logout",
        "log out",
        "sign out",

        "delete",
        "remove",

        "close",
        "cancel"

    ];

    public static filter(
        elements: RawElement[]
    ): RawElement[] {

        return elements.filter(element => {

            const text = element.text.trim();

            if (!text) {
                return false;
            }

            if (!element.visible) {
                return false;
            }

            if (!element.enabled) {
                return false;
            }

            const href = element.href.toLowerCase();

            if (
                href.startsWith("javascript:") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {
                return false;
            }

            const lower = text.toLowerCase();

            if (
                this.blacklist.some(word =>
                    lower.includes(word)
                )
            ) {
                return false;
            }

            return true;

        });

    }

}