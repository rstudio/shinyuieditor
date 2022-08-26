import { test, expect } from "@playwright/test";

import { basicNavbarPage } from "../src/state/backupUiTree";

test("Basic usage of navbar page", async ({ page }) => {
  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(basicNavbarPage),
    })
  );

  await page.goto("/");

  await page.locator("text=Plot 1").click();

  await page
    .locator(
      `[aria-label="tab panel Plot 1"] [aria-label="shiny::plotOutput element"]`
    )
    .click();

  await page.locator("text=Delete Element").click();

  await page.dragAndDrop(
    "text=/^Dynamic UI Output$/",
    `[aria-label="tab panel Plot 1"]`
  );
});
