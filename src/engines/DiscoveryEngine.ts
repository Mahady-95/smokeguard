import { BrowserManager } from "../core/BrowserManager";
import { Logger } from "../core/Logger";
import { QueueService } from "../services/QueueService";
import { NavigationDiscoverer } from "../discoverers/NavigationDiscoverer";
import { NavigationService } from "../services/NavigationService";
import { ElementFilter } from "../services/ElementFilter";
import { NavigationScorer } from "../services/NavigationScorer";

export class DiscoveryEngine {

    public static async discover(): Promise<void> {

        Logger.step("Discovering Navigation");

        const page = BrowserManager.getPage();

        await NavigationService.waitUntilReady(page);

        const items = await NavigationDiscoverer.discover(page);

        //QueueService.enqueueMany(items);
        const filtered = ElementFilter.filter(items);

        const scored = NavigationScorer.score(filtered);

        QueueService.enqueueMany(scored);

        Logger.success(`${QueueService.size()} navigation item(s) discovered`);

        const queue = QueueService.getAll();

        Logger.info("");

        Logger.info("=========== Navigation Queue ===========");

        queue.forEach((item, index) => {

            Logger.info(

                `${index + 1}. [${item.score}] ${item.name} -> ${item.url}`

            );

        });

        Logger.info("========================================");

        Logger.info("======================================");

    }


}