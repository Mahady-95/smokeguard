import { test } from "@playwright/test";

import { ExecutionManager } from "../src/engines/ExecutionManager";

test("Smoke Framework Startup", async () => {

    await ExecutionManager.execute();

    await ExecutionManager.finish();

});