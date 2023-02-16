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
  await page.dragAndDrop(
    "text=/^Action Button$/",
    `.grid-cell[data-cell-pos="1-1"]`
  );

  // Fill in the area naming popup

  await page.locator('[aria-label="Name of new grid area"]').fill("settings");
  // Click text=Done
  await page.locator("text=Done").click();

  // Select the action button and change its label to "Action Button"
  await page.locator("text=My Button").click();
  await page.locator('[aria-label="Label text"]').fill("Action Button");

  await expect(
    page.locator("button", { hasText: "Action Button" })
  ).toBeVisible();
});
