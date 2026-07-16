import { test, expect } from "@playwright/test";

import { ConfigManager } from "../src/core/ConfigManager";
import { BrowserManager } from "../src/core/BrowserManager";

import { LocatorService } from "../src/services/LocatorService";
import { LoginLocators } from "../src/locators/LoginLocators";

test("Locate Login Elements", async () => {

    ConfigManager.load();

    await BrowserManager.launch();

    const page = BrowserManager.getPage();

    await page.goto(ConfigManager.get().baseUrl);

    let username = await LocatorService.find(
        page,
        LoginLocators.username
    );

    if (!username) {

        username = await LocatorService.findByInputAnalysis(
            page
        );

    }

    const password = await LocatorService.find(
        page,
        LoginLocators.password
    );

    const submit = await LocatorService.find(
        page,
        LoginLocators.submit
    );

    expect(username).not.toBeNull();

    expect(password).not.toBeNull();

    expect(submit).not.toBeNull();

    await BrowserManager.close();

});