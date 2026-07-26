import { PageSnapshot } from "../models/PageSnapshot";
import { SnapshotAnalysisResult } from "../models/SnapshotAnalysisResult";

export class SnapshotAnalyzer {

    public static compare(

        before: PageSnapshot,

        after: PageSnapshot

    ): SnapshotAnalysisResult {

        let score = 0;

        const rowCountChanged =

            before.rowCount !== after.rowCount;

        if (rowCountChanged) {

            score += 25;

        }

        const textChanged =

            before.pageText !== after.pageText;

        if (textChanged) {

            score += 25;

        }

        const urlChanged =

            before.url !== after.url;

        if (urlChanged) {

            score += 15;

        }

        const loadingCompleted =

            before.loadingVisible &&
            !after.loadingVisible;

        if (loadingCompleted) {

            score += 20;

        }

        const noDataAppeared =

            !before.noDataVisible &&
            after.noDataVisible;

        if (noDataAppeared) {

            score += 15;

        }

        const pageChanged =

            rowCountChanged ||
            textChanged ||
            urlChanged ||
            noDataAppeared;

        const passed =

            score >= 40;

        return {

            passed,

            score,

            pageChanged,

            rowCountChanged,

            textChanged,

            urlChanged,

            loadingCompleted,

            noDataAppeared,

            executionTime:

                after.timestamp -
                before.timestamp,

            message:

                this.buildMessage(

                    passed,

                    score,

                    rowCountChanged,

                    textChanged,

                    urlChanged,

                    loadingCompleted,

                    noDataAppeared

                )

        };

    }

    private static buildMessage(

        passed: boolean,

        score: number,

        rowChanged: boolean,

        textChanged: boolean,

        urlChanged: boolean,

        loadingCompleted: boolean,

        noDataAppeared: boolean

    ): string {

        const changes: string[] = [];

        if (rowChanged) {

            changes.push("Row count changed");

        }

        if (textChanged) {

            changes.push("Page content changed");

        }

        if (urlChanged) {

            changes.push("URL changed");

        }

        if (loadingCompleted) {

            changes.push("Loading completed");

        }

        if (noDataAppeared) {

            changes.push("No data message appeared");

        }

        if (changes.length === 0) {

            changes.push("No observable page changes");

        }

        return `${passed ? "PASS" : "FAIL"} | Score: ${score}/100 | ${changes.join(", ")}`;

    }

}