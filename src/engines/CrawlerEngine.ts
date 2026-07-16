// import { BrowserManager } from "../core/BrowserManager";
// import { Logger } from "../core/Logger";
// import { NavigationService } from "../services/NavigationService";

// export class CrawlerEngine {

//     public static async crawl(): Promise<void> {

//         const page = BrowserManager.getPage();

//         Logger.step("Discovering Pages");

//         const pages = await NavigationService.discover(page);

//         Logger.success(`${pages.length} page(s) discovered`);

//         for (const item of pages) {

//             try {

//                 Logger.step(`Visiting : ${item.title}`);

//                 await page.goto(item.url);

//                 Logger.success(await page.title());

//             }

//             catch (error) {

//                 Logger.error(

//                     `Failed : ${item.title}`

//                 );

//             }

//         }

//     }

// }

export class CrawlerEngine {

    public static async crawl(): Promise<void> {

        // TODO:
        // Crawler will be implemented after
        // Discovery Engine is completed.

    }

}