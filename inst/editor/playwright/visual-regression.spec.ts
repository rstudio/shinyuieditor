import { expect, test } from "@playwright/test";

import type { ShinyUiNode } from "../src/ui-node-definitions/ShinyUiNode";

import { startupMockedApp } from "./utils/mockBackend";
const testingUiTree: ShinyUiNode = {
  id: "grid_page",
  namedArgs: {
    layout: [". .", ". ."],
    row_sizes: ["1fr", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  children: [],
};

test("Landing page visual regression", async ({ page }) => {
  await startupMockedApp(page, { ui_tree: testingUiTree, language: "R" });

  await expect(page).toHaveScreenshot();
});

test("Template-Chooser visual regression", async ({ page }) => {
  await startupMockedApp(page, { language: "R" });

  // Make sure we get past the loading splash page
  await expect(
    page.getByRole("heading", { name: "Choose App Template" })
  ).toBeVisible();

  await expect(page).toHaveScreenshot();
});
