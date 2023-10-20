import { expect, test } from "@playwright/test";

import type { ShinyUiNode } from "../src/ui-node-definitions/ShinyUiNode";

import { startupMockedApp } from "./utils/mockBackend";

const testingUiTree: ShinyUiNode = {
  id: "grid_page",
  namedArgs: {
    layout: ["A"],
    row_sizes: ["1fr"],
    col_sizes: ["1fr"],
    gap_size: "1rem",
  },
  children: [
    {
      id: "grid_card",
      namedArgs: { area: "A" },
      children: [
        {
          id: "card_body",
          namedArgs: {},
          children: [
            {
              id: "radioButtons",
              namedArgs: {
                inputId: "radioA",
                label: "Radio A",
                choices: {
                  A1: "a1",
                  A2: "a2",
                },
              },
            },
            {
              id: "radioButtons",
              namedArgs: {
                inputId: "radioB",
                label: "Radio B",
                choices: {
                  B1: "b1",
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

test("Switching between two inputs doesn't swap their values", async ({
  page,
}) => {
  await startupMockedApp(page, { ui_tree: testingUiTree, language: "R" });

  // Select first radio buttons node
  await page.getByText("Radio A").click();

  const propertiesPanel = page.getByLabel(/properties panel/i);
  // Make sure choices are visible in settings
  await page
    .locator("div")
    .filter({ hasText: /^Choices$/ })
    .isVisible();
  // Make sure choices are visible in settings

  // Make sure there are two existing choices as indicated by the aria-label of "List item"
  // and they have values of A1 and A2
  expect(await propertiesPanel.getByLabel(/^list item$/i).count()).toBe(2);

  await expect(
    propertiesPanel.getByRole("textbox", { name: "List item key" }).first()
  ).toHaveValue("A1");

  await expect(
    propertiesPanel.getByRole("textbox", { name: "List item key" }).last()
  ).toHaveValue("A2");

  // Now select the other radio buttons node
  await page.getByText("Radio B", { exact: true }).click();

  // Make sure we have just one list item with value of B1
  expect(await propertiesPanel.getByLabel(/^list item$/i).count()).toBe(1);
  await expect(
    propertiesPanel.getByRole("textbox", { name: "List item key" }).first()
  ).toHaveValue("B1");
});

test("Can add new element to a named list", async ({ page }) => {
  await startupMockedApp(page, { ui_tree: testingUiTree, language: "R" });

  const propertiesPanel = page.getByLabel(/properties panel/i);

  // Make sure we get past the loading splash page
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  // Select first radio buttons node
  await page.getByText("Radio A").click();

  // Make sure choices are visible in settings
  await page
    .locator("div")
    .filter({ hasText: /^Choices$/ })
    .isVisible();

  // Make sure there are two existing choices as indicated by the aria-label of "List item"
  expect(await propertiesPanel.getByLabel(/^list item$/i).count()).toBe(2);

  // Add new choice
  await page.getByRole("button", { name: "Add new item to list" }).click();

  // Now there should be three choices
  expect(await propertiesPanel.getByLabel(/^list item$/i).count()).toBe(3);
});

const onMismatchApp = `library(shiny)
library(plotly)
library(gridlayout)
library(bslib)

ui <- grid_page(
  layout = c(
    "sidebar"
  ),
  gap_size = "1rem",
  col_sizes = c(
    "1fr"
  ),
  row_sizes = c(
    "1fr"
  ),
  grid_card(
    area = "sidebar",
    card_body(
      selectInput(
        inputId = "choice",
        label = "Choose things",
        choices = list(
          "A" = "A",
          "B" = "b",
        ),
        selected = "A"
      )
    )
  )
)


server <- function(input, output) {
  
}

shinyApp(ui, server)`;

test("Will warn of mismatch when trying to simplify", async ({ page }) => {
  await startupMockedApp(page, {
    app_script: onMismatchApp,
    language: "R",
  });

  // Select the select input node
  await page.getByText("Choose things").click();

  // Open settings popover
  const settingsButton = page.getByLabel("Open settings for Choices argument");

  await settingsButton.click();

  // Click the "Seprate label and values" checkbox to trigger the warning
  await page.getByLabel(/keys and value mode/i).click();

  // Make sure the warning is visible
  await page.getByText(/there are some mismatches/i).isVisible();

  // Press cancel to close the warning without doing anything
  await page.getByRole("button", { name: "Cancel" }).click();

  // Make sure the warning is gone but we're still in the separate key/value mode
  await expect(page.getByText(/there are some mismatches/i)).not.toBeVisible();
  await expect(page.getByLabel(/keys and value mode/i)).toBeChecked();

  // Close settings popover
  await settingsButton.click();

  const keyInputsQuery = page.getByRole("textbox", {
    name: "List item key",
  });
  const valueInputsQuery = page.getByRole("textbox", {
    name: "List item value",
  });

  // There should be multiple key fields visible in the properties pane
  expect(await keyInputsQuery.count()).toBeGreaterThan(1);

  // And one of them should have the value of "B"
  await expect(keyInputsQuery.last()).toHaveValue("B");

  // Now click checkbox again, but this time press the merge button
  await settingsButton.click();

  await page.getByLabel(/keys and value mode/i).click();
  await page.getByRole("button", { name: "Merge" }).click();

  await settingsButton.click();

  // There should no longer be any key fields visible
  expect(await keyInputsQuery.count()).toBe(0);

  // There should still be value fields, though
  expect(await valueInputsQuery.count()).toBeGreaterThan(1);

  // Find all the value fields and make sure that one of them has the value of "B"
  await expect(valueInputsQuery.last()).toHaveValue("b");

  // Now we can go back to key-value mode
  await settingsButton.click();
  await page.getByLabel(/keys and value mode/i).click();
  await settingsButton.click();

  // There should be multiple key fields visible in the properties pane
  expect(await keyInputsQuery.count()).toBeGreaterThan(1);

  // Now that we've updated the value to not have mismatches we should be able
  // to go back to simple mode without a warning appearing
  await settingsButton.click();
  await page.getByLabel(/keys and value mode/i).click();
  await settingsButton.click();

  // There should no longer be any key fields visible
  expect(await keyInputsQuery.count()).toBe(0);

  // Adding a new element to the list will respect the current key-value state
  await page.getByRole("button", { name: "Add new item to list" }).click();

  // There should still no longer be any key fields visible
  expect(await keyInputsQuery.count()).toBe(0);

  // Switch back to key-value mode and now adding an element _should_ keep stuff in keyvalue mode
  await settingsButton.click();
  await page.getByLabel(/keys and value mode/i).click();
  await settingsButton.click();

  // There should be multiple key fields visible in the properties pane
  expect(await keyInputsQuery.count()).toBeGreaterThan(1);

  // Add new element
  await page.getByRole("button", { name: "Add new item to list" }).click();

  // There should still be multiple key fields visible in the properties pane
  expect(await keyInputsQuery.count()).toBeGreaterThan(1);
});
