export interface Session {

    sessionId: string;

    applicationName: string;

    environment: string;

    browser: string;

    startTime: string;

    endTime?: string;

    duration?: string;

    status: "RUNNING" | "PASSED" | "FAILED";

}