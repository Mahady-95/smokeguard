export interface IConfig {

    applicationName: string;

    baseUrl: string;

    username: string;

    password: string;

    browser: "chromium" | "firefox" | "webkit";

    headless: boolean;

    timeout: number;

    retry: number;

    screenshot: {

        mode: "always" | "failed" | "never";

        fullPage: boolean;

    };

}