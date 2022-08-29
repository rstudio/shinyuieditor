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

  // First we switch to a different tab
  await page.locator("text=Plot 1").click();

  // Now we select the element contained within that tab
  await page
    .locator(`[aria-label="tab panel Plot 1"] [aria-label="shiny::plotOutput"]`)
    .click();

  // Next we delete that element
  await page.locator("text=Delete Element").click();

  // Now we drag a new dynamic ui output into the now empty tab
  await page.dragAndDrop(
    "text=/^Dynamic UI Output$/",
    `[aria-label="tab panel Plot 1"]`
  );

  // Rename tab
  const newTabName = "Dynamic UI";

  // Click the tab to set selection to tab panel itself
  await page.locator("text=Plot 1").click();

  await page.locator(`[aria-label="input for title"]`).click({ clickCount: 3 });
  await page.locator(`[aria-label="input for title"]`).type(newTabName);

  // Now there should be a tab with the new name and not a tab with the old name
  await page.locator(`[aria-label = "Active tab ${newTabName}"]`);

  await expect(page.locator(`[aria-label = "Active tab Plot 1"]`)).toHaveCount(
    0
  );
});
