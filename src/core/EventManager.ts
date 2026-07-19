import { Page } from "@playwright/test";

export class EventManager {

    private static consoleErrors: string[] = [];

    private static networkErrors: string[] = [];

    private static initialized = false;

    public static initialize(page: Page): void {

        if (this.initialized) {
            return;
        }

        this.initialized = true;

        page.on("console", message => {

            if (message.type() === "error") {

                this.consoleErrors.push(message.text());

            }

        });

        page.on("response", response => {

            if (response.status() >= 400) {

                this.networkErrors.push(
                    `${response.status()} ${response.url()}`
                );

            }

        });

    }

    public static reset(): void {

        this.consoleErrors = [];
        this.networkErrors = [];

    }

    public static getConsoleErrors(): string[] {

        return [...this.consoleErrors];

    }

    public static getNetworkErrors(): string[] {

        return [...this.networkErrors];

    }

}