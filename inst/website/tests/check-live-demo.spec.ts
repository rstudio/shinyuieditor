import { test, expect } from "@playwright/test";

test("Live Demo loads and can be navigated", async ({ page }) => {
  await page.goto("http://localhost:4321/shinyuieditor");

  // Main landing page reached
  await expect(page).toHaveTitle(/ShinyUiEditor/);

  // Navigate to the live-demo page.
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Live Demo" })
    .click();

  // Wait till the text "Choose App Template" is visible
  await page.waitForSelector("text=Choose App Template");

  // Select a template.
  await page.locator(".template-container").first().click();

  // Click button to proceed with template
  await page
    .getByRole("button", { name: "Start editor with selected template" })
    .click();

  // Make sure the main view has loaded by looking for the "Elements" section
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  // Make sure tour mode works
  // Click "Tour App" button
  await page.getByRole("button", { name: "Tour App" }).click();

  // Make sure that the tour has started
  await expect(page.getByRole("alertdialog")).toBeVisible();

  // Close the tour with the X button
  await page.getByLabel("Close").click();

  // Make sure that the tour has closed
  await expect(page.getByRole("alertdialog")).not.toBeVisible();
});
