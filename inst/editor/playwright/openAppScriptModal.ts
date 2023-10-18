import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export async function openAppScriptModal(page: Page) {
  // Click the "Get app script" button to open the app script modal
  await page.click("text=Get app script");

  // Wait for the modal to open
  await expect(page.getByRole("dialog")).toBeVisible();
}
export async function closeAppScriptModal(page: Page) {
  // Close modal
  await page.click("text=Okay");
}
