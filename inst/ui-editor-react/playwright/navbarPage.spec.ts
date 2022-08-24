import { test, expect } from "@playwright/test";

import { basicNavbarPage } from "../src/state/backupUiTree";

test("Drag and drop an item onto the grid and name area", async ({ page }) => {
  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(basicNavbarPage),
    })
  );

  await page.goto("/");
});
