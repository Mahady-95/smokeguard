import { NavigationItem } from "../models/NavigationItem";

export class ElementFilter {

    private static readonly blacklist = [

        "",

        "logout",
        "log out",
        "sign out",

        "delete",
        "remove",

        "close",
        "cancel",

        "privacy",
        "terms",

        "facebook",
        "twitter",
        "linkedin",

        "youtube",
        "instagram"

    ];

    public static filter(
        items: NavigationItem[]
    ): NavigationItem[] {

        return items.filter(item => {

            const name = item.name.trim().toLowerCase();

            if (!name) {

                return false;

            }

            return !this.blacklist.some(word =>
                name.includes(word)
            );

        });

    }

}