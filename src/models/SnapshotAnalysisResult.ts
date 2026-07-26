export interface SnapshotAnalysisResult {

    passed: boolean;

    score: number;

    pageChanged: boolean;

    rowCountChanged: boolean;

    textChanged: boolean;

    urlChanged: boolean;

    loadingCompleted: boolean;

    noDataAppeared: boolean;

    executionTime: number;

    message: string;

}