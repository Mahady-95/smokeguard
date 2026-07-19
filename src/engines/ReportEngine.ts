//import { ConsoleReport } from "../reports";

import { ConsoleReport } from "../reports/ConsoleReport";
//import { ConsoleReport } from "../../reports/ConsoleReport";
export class ReportEngine {

    public static async generate(): Promise<void> {

        ConsoleReport.generate();

    }

}