import { Logger } from "../core/Logger";
import { ResultManager } from "../core/ResultManager";

export class ConsoleReport {

    public static generate(): void {

        Logger.info("");

        Logger.info("========== SmokeGuard Report ==========");

        Logger.info(
            `Total Pages : ${ResultManager.total()}`
        );

        Logger.info(
            `Passed     : ${ResultManager.passed()}`
        );

        Logger.info(
            `Failed     : ${ResultManager.failed()}`
        );

        Logger.info("");

        ResultManager.getAll().forEach(result => {

            Logger.info(

                `${result.passed ? "✅" : "❌"} ${result.pageName}`

            );

        });

        Logger.info("");

        Logger.info("=======================================");

    }

}