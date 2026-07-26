import fs from "fs";
import path from "path";

import { ResultManager } from "../core/ResultManager";
import { SessionManager } from "../core/SessionManager";

import {
    ReportStatisticsBuilder
} from "./ReportStatistics";

import { HtmlTemplate } from "./HtmlTemplate";

export class HtmlReport {

    public static generate(): void {

        const results = ResultManager.getAll();

        const statistics =
            ReportStatisticsBuilder.build(results);

        const reportFolder = path.join(
            SessionManager.getRunPath(),
            "report"
        );

        fs.mkdirSync(reportFolder, {
            recursive: true
        });

        const rows = results.map(result => {

            const validations = result.validations ?? [];

const validationSummary =

    validations.length === 0

        ? "-"

        : validations

            .map(validation => {

                const icon =
                    validation.passed
                        ? "✅"
                        : "❌";

                return `${icon} ${validation.validator}`;

            })

            .join("<br>");
            const readyStatus =

    result.pageReady.ready

        ? "✅"

        : "❌";
        const screenshot = result.screenshot

            ? `
<a href="../${result.screenshot.replace(/\\/g, "/")}" target="_blank">

<img
src="../${result.screenshot.replace(/\\/g, "/")}"
width="120"
/>

</a>
`

            : "-";

        return `

<tr class="${result.executionTime > 3000 ? "slow" : ""}">

<td>

<strong>${result.pageName}</strong>

<br>

<small>${result.url}</small>

</td>

<td>

${result.executionTime} ms

</td>

<td>

${result.pageLoaded ? "✅" : "❌"}

</td>

<td>

${readyStatus}

</td>

<td>

${result.components.buttons}

</td>

<td>

${result.components.inputs}

</td>

<td>

${result.components.tables}

</td>

<td>

${result.components.searchBoxes > 0 ? "YES" : "-"}

</td>

<td>

${result.components.paginations > 0 ? "YES" : "-"}

</td>

<td>

${result.components.filters > 0 ? "YES" : "-"}

</td>

<td>

${result.consoleErrors.length}

</td>

<td>

${result.networkErrors.length}

</td>

<td>

${validationSummary}

</td>

<td>

${screenshot}

</td>

<td>

<span class="badge ${result.passed ? "pass" : "fail"}">

${result.passed ? "PASS" : "FAIL"}

</span>

</td>

</tr>

`;

    }).join("");

    const html = HtmlTemplate.render(

        statistics,

        new Date().toLocaleString(),

        rows

    );

        fs.writeFileSync(

        path.join(
            reportFolder,
            "index.html"
        ),

            html,

            "utf8"

        );

    }

}