export interface NavigationItem {

    id: string;

    name: string;

    url: string;

    score: number;

    source: "link" | "button" | "menu";

}