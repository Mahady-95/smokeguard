import { BrowserManager } from "../core/BrowserManager";
import { ConfigManager } from "../core/ConfigManager";
import { Logger } from "../core/Logger";
import { LocatorService } from "../services/LocatorService";
import { LoginLocators } from "../locators/LoginLocators";
import { NavigationService } from "../services/NavigationService";

export class LoginEngine {

    public static async login(): Promise<void> {

        const page = BrowserManager.getPage();

        const config = ConfigManager.get();

        Logger.step("Opening Login Page");

        await page.goto(config.baseUrl);

        Logger.success("Login Page Loaded");

        await page.waitForLoadState("networkidle");

        await page.waitForTimeout(2000);

        await page.screenshot({
            path: "login-page.png",
            fullPage: true
        });

        Logger.step("Finding Login Elements");

        let username = await LocatorService.find(
            page,
            LoginLocators.username
        );

        if (!username) {

            username = await LocatorService.findByInputAnalysis(page);

        }

        const password = await LocatorService.find(
            page,
            LoginLocators.password
        );

        const submit = await LocatorService.find(
            page,
            LoginLocators.submit
        );

        if (!username) {

            throw new Error("Username field not found.");

        }

        if (!password) {

            throw new Error("Password field not found.");

        }

        if (!submit) {

            throw new Error("Login button not found.");

        }

        Logger.success("Login Elements Found");

        Logger.step("Performing Login");

        await username.fill(config.username);

        await password.fill(config.password);

        await submit.click();

        await NavigationService.waitUntilReady(page);

        Logger.success("Login Submitted");

        Logger.success("Login Submitted");

    }

}