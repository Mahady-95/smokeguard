import { ConsoleReport } from "../reports/ConsoleReport";
import { HtmlReport } from "../reports/HtmlReport";

export class ReportEngine {

    public static async generate(): Promise<void> {

        ConsoleReport.generate();

        HtmlReport.generate();

    }

}