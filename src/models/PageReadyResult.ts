export interface PageReadyResult {

    ready: boolean;

    duration: number;

    domReady: boolean;

    networkIdle: boolean;

    spinnerVisible: boolean;

    reason?: string;

}