export interface NavigationItem {

    id: string;

    name: string;

    url: string;

    level: number;

    source: "link" | "button" | "menu";

    score: number;

}