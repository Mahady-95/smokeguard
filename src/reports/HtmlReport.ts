import fs from "fs";
import path from "path";

import { ResultManager } from "../core/ResultManager";
import { SessionManager } from "../core/SessionManager";

import { HtmlTemplate } from "./HtmlTemplate";

export class HtmlReport {

    public static generate(): void {

        const results = ResultManager.getAll();

        const reportFolder = path.join(
            SessionManager.getRunPath(),
            "report"
        );

        fs.mkdirSync(reportFolder, {
            recursive: true
        });

        const total = results.length;

        const passed =
            results.filter(result => result.passed).length;

        const failed =
            total - passed;

        const rows = results.map(result => {

            const screenshot = result.screenshot
                ? `
<a href="../${result.screenshot.replace(/\\/g, "/")}" target="_blank">
    <img
        src="../${result.screenshot.replace(/\\/g, "/")}"
        width="120"
        alt="Screenshot"
    />
</a>`
                : "-";

            const totalComponents =
                result.components.elements.length;

            const validatedComponents =
                result.components.elements.filter(
                    component => component.validated
                ).length;

            const failedComponents =
                totalComponents - validatedComponents;

            const failedComponentRows =
                result.components.elements
                    .filter(component => !component.validated)
                    .map(component => `
<li>
    <b>${component.tag}</b>
    &nbsp;|&nbsp;
    ${component.selector}
</li>
`)
                    .join("");

            return `

<tr class="${result.executionTime > 3000 ? "slow" : ""}">

<td>${result.pageName}</td>

<td>${result.executionTime} ms</td>

<td>${result.pageLoaded ? "Yes" : "No"}</td>

<td>${result.consoleErrors.length}</td>

<td>${result.networkErrors.length}</td>

<td>${screenshot}</td>

<td>

<span class="badge ${result.passed ? "pass" : "fail"}">

${result.passed ? "PASS" : "FAIL"}

</span>

</td>

</tr>

<tr>

<td colspan="7">

<div class="component-summary">

<b>Component Validation Summary</b>

<br><br>

Found :
<b>${totalComponents}</b>

&nbsp;&nbsp;|&nbsp;&nbsp;

Validated :
<b>${validatedComponents}</b>

&nbsp;&nbsp;|&nbsp;&nbsp;

Failed :
<b>${failedComponents}</b>

${

failedComponents > 0

?

`

<hr>

<b>Failed Components</b>

<ul>

${failedComponentRows}

</ul>

`

:

`

<div style="color:#16a34a;font-weight:bold;margin-top:10px;">

All discovered components validated successfully.

</div>

`

}

</div>

</td>

</tr>

`;

        }).join("");

        const html = HtmlTemplate.render(

            total,

            passed,

            failed,

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