import { Page } from "@playwright/test";

export class ConsoleValidator {

    public static attach(
        page: Page,
        errors: string[]
    ): void {

        page.on("console", message => {

            if (
                message.type() === "error"
            ) {

                errors.push(
                    message.text()
                );

            }

        });

    }

}