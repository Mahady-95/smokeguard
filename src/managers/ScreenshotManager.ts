import fs from "fs";
import path from "path";

import { Page } from "@playwright/test";

import { ConfigManager } from "../core/ConfigManager";
import { SessionManager } from "../core/SessionManager";

export class ScreenshotManager {

    private static counter = 1;

    public static async capture(

        page: Page,

        pageName: string,

        passed: boolean

    ): Promise<string | null> {

        const config = ConfigManager.get();

        if (config.screenshot.mode === "never") {

            return null;

        }

        if (config.screenshot.mode === "failed" && passed) {

            return null;

        }

        const folder = path.join(

            SessionManager.getRunPath(),

            "screenshots"

        );

        fs.mkdirSync(folder, { recursive: true });

        const index = String(this.counter++).padStart(3, "0");

        const filename = `${index}_${this.sanitize(pageName)}.png`;

        const fullPath = path.join(folder, filename);

        await page.screenshot({

            path: fullPath,

            fullPage: config.screenshot.fullPage

        });

        return fullPath;

    }

    public static reset(): void {

        this.counter = 1;

    }

    private static sanitize(value: string): string {

        return value
            .trim()
            .replace(/[<>:"/\\|?*]/g, "_")
            .replace(/\s+/g, "_")
            .toLowerCase();

    }

}