import { test } from "@playwright/test";
import { ConfigManager } from "../src/core/ConfigManager";

test("Load Configuration", async () => {

    ConfigManager.load();

    const config = ConfigManager.get();

    console.log(config);

});