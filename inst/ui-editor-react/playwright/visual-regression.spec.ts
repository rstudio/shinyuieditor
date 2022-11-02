import { test, expect } from "@playwright/test";

import { testingUiTree } from "../src/state/backupUiTree";

import { mockBackendState } from "./utils/mockBackend";

test("Landing page visual regression", async ({ page }) => {
  await mockBackendState(page, testingUiTree);

  await page.goto("/");

  // Make sure we get past the loading splash page
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  await expect(page).toHaveScreenshot();
});

test("Template-Chooser visual regression", async ({ page }) => {
  await mockBackendState(page, "TEMPLATE_CHOOSER");

  await page.goto("/");

  // Make sure we get past the loading splash page
  await expect(
    page.getByRole("heading", { name: "Choose App Template" })
  ).toBeVisible();

  await expect(page).toHaveScreenshot();
});
