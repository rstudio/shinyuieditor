import { test, expect } from "@playwright/test";

import { startupMockedApp } from "./utils/mockBackend";

test("Live Demo loads and can be navigated", async ({ page }) => {
  await startupMockedApp(page, { language: "R" });

  // Select a template.
  await page.locator(".template-container").first().click();

  // Click button to proceed with template
  await page
    .getByRole("button", { name: "Start editor with selected template" })
    .click();

  // Make sure the main view has loaded by looking for the "Elements" section
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  // Click "Tour App" button
  await page.getByRole("button", { name: "Tour App" }).click();

  // Make sure that the tour has started
  await expect(page.getByRole("alertdialog")).toBeVisible();

  // Get the text content of the tour alert dialog so we can check that it changes in the next step
  const tourText = await page.getByRole("alertdialog").textContent();

  // Click the "Next" button
  await page.getByRole("button", { name: "Next" }).click();

  // Make sure that the tour has advanced to the next step by checking that the
  // text content of the alert dialog has changed
  const tourText2 = await page.getByRole("alertdialog").textContent();
  expect(tourText2).not.toBe(tourText);

  // Close the tour with the X button
  await page.getByLabel("Close").click();

  // Make sure that the tour has closed
  await expect(page.getByRole("alertdialog")).not.toBeVisible();

  // Re-opening the tour will start from the left off step
  await page.getByRole("button", { name: "Tour App" }).click();
  expect(await page.getByRole("alertdialog").textContent()).toBe(tourText2);

  // Pressing the back button will go back to the first step
  await page.getByRole("button", { name: "Back" }).click();
  expect(await page.getByRole("alertdialog").textContent()).toBe(tourText);
});
