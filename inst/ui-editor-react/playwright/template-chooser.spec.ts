import type { Locator } from "@playwright/test";
import { expect, test } from "@playwright/test";

import type { ShinyUiRootNode } from "../src/Shiny-Ui-Elements/uiNodeTypes";

const templateCooserState: ShinyUiRootNode = "TEMPLATE_CHOOSER";

test("Updating the area name of a grid item propigates through rest of app properly", async ({
  page,
}) => {
  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(templateCooserState),
    })
  );

  await page.goto("/");

  //   The default state is no selection thus the proceed button shouldn't be allowed
  await expect(page.locator(`text=Select a template`)).toBeDisabled();

  // Check that the filtering works

  // First, we should have some tab apps shown
  await expect(page.getByTitle(/navbarPage/i)).not.toHaveCount(0);

  // Hide tab layouts using filter
  await page.getByLabel("Tabs").click();

  // Now no tab apps should be visible
  await expect(page.getByTitle(/navbarPage layout app/i)).toHaveCount(0);

  // Reset tabs filter
  await page.getByLabel("Tabs").click();

  // Select a given template
  await page
    .locator(`[aria-label="App template preview card"]`)
    .first()
    .click();

  // Check for template selection
  await expect(page.locator(`[data-selected="true"]`)).toBeVisible();

  // Make sure we can proceed
  await expect(page.locator(`button`).locator("text=next")).toBeVisible();

  // Set filter so selected template is no longer available, make sure we can't proceed
  const layoutCheckboxes = await page.locator(
    '[aria-label="App layout type filters"] [type="checkbox"]'
  );

  clickAllSelected(layoutCheckboxes);

  // There should be no selected template
  await expect(page.locator(`text=Select a template`)).toBeDisabled();

  // There should be a message about no filters being available
  await expect(
    page.locator(
      `text=No app templates fit current filters. Try broadening your search.`
    )
  ).toBeVisible();

  // Resetting all the layout filters to enabled should still not have a selected layout
  await clickAllSelected(
    page.locator('[aria-label="App layout type filters"] [type="checkbox"]')
  );

  // Filter broadening message should be gone but no selection will remain
  await expect(
    page.locator(
      `text=No app templates fit current filters. Try broadening your search.`
    )
  ).not.toBeVisible();

  await expect(page.locator(`[data-selected="true"]`)).toHaveCount(0);

  // Select a new template and proceed
  await page.locator(`[aria-label="App template preview card"]`).last().click();

  await page.locator(`button`).locator("text=next").click();

  // TODO: When backend updates have been made, make sure that the single/multifile status is respected in request call.

  // Make sure app has changed
});

async function clickAllSelected(selection: Locator) {
  const count = await selection.count();

  for (let i = 0; i < count; i++) {
    await selection.nth(i).click();
  }
}
