import { test, expect } from "@playwright/test";

import { testingUiTree } from "../src/state/backupUiTree";

test("Landing page visual regression", async ({ page }) => {
  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(testingUiTree),
    })
  );

  await page.goto("/");

  await expect(page).toHaveScreenshot();
});
