import fs from "fs";
import path from "path";

import { Page } from "@playwright/test";

import { SessionManager } from "../core/SessionManager";

export class ScreenshotManager {

    private static readonly folder = "screenshots";

    public static async capture(

        page: Page,

        pageName: string

    ): Promise<string | null> {

        try {

            const screenshotFolder = path.join(

                SessionManager.getRunPath(),

                this.folder

            );

            if (!fs.existsSync(screenshotFolder)) {

                fs.mkdirSync(screenshotFolder, {

                    recursive: true

                });

            }

            const safeName = this.sanitize(pageName);

            const filename = `${safeName}.png`;

            const fullPath = path.join(

                screenshotFolder,

                filename

            );

            await page.screenshot({

                path: fullPath,

                fullPage: true

            });

            return fullPath;

        }

        catch {

            return null;

        }

    }

    private static sanitize(

        value: string

    ): string {

        return value

            .trim()

            .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")

            .replace(/\s+/g, "_")

            .toLowerCase();

    }

}