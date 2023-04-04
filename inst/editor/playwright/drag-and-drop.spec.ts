import { test, expect } from "@playwright/test";

import type { ShinyUiNode } from "../src/main";

import { mockBackendState } from "./utils/mockBackend";
const testingUiTree: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    layout: [". .", ". ."],
    row_sizes: ["1fr", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [],
};

test("Drag and drop an item onto the grid and name area", async ({ page }) => {
  await mockBackendState(page, testingUiTree);

  await page.goto("/");

  // Drag and drop a numeric input onto the upper-left grid cell
  await page.dragAndDrop("text=/^Action Button$/", `[data-cell-pos="1-1"]`);

  // Fill in the area naming popup
  await page.locator('[aria-label="Name of new grid area"]').fill("settings");
  // Click text=Done
  await page.locator("text=Done").click();

  // Select the action button and change its label to "Action Button"

  const updated_button_label = "My Updated Label";
  const card_locator = page.locator("[data-grid-area='settings']");

  await card_locator.locator("text=My Button").click();

  await page.locator('[aria-label="Label"]').fill(updated_button_label);

  await expect(
    card_locator.locator("button", { hasText: updated_button_label })
  ).toBeVisible();
});
