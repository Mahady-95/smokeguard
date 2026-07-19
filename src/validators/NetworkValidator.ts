import { Page } from "@playwright/test";

export class NetworkValidator {

    public static attach(
        page: Page,
        errors: string[]
    ): void {

        page.on(
            "response",
            response => {

                if (
                    response.status() >= 400
                ) {

                    errors.push(

                        `${response.status()} : ${response.url()}`

                    );

                }

            }
        );

    }

}