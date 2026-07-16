import { BrowserManager } from "../core/BrowserManager";
import { Logger } from "../core/Logger";

import { DOMDiscoverer } from "../discoverers/DOMDiscoverer";

import { ElementFilter } from "../services/ElementFilter";
import { NavigationScorer } from "../services/NavigationScorer";
import { QueueService } from "../services/QueueService";

export class DiscoveryEngine {

    public static async discover(): Promise<void> {

        Logger.step("Discovering DOM");

        const page = BrowserManager.getPage();

        const rawElements =
            await DOMDiscoverer.discover(page);

        Logger.info(
            `Raw Elements : ${rawElements.length}`
        );

        const filtered =
            ElementFilter.filter(rawElements);

        Logger.info(
            `Filtered Elements : ${filtered.length}`
        );

        const navigation =
            NavigationScorer.score(filtered);

        Logger.info(
            `Navigation Items : ${navigation.length}`
        );

        QueueService.clear();

        QueueService.enqueueMany(navigation);

        Logger.info("");
        Logger.info("========== Navigation Queue ==========");

        QueueService.getAll().forEach((item, index) => {

            Logger.info(
                `${index + 1}. [${item.score}] ${item.name}`
            );

        });

        Logger.info("======================================");

    }

}