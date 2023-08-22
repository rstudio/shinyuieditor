import { test, expect } from "@playwright/test";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

import { mockBackendState } from "./utils/mockBackend";

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
  await mockBackendState(page, { ui_tree: testingUiTree, language: "R" });

  await page.goto("/");

  // Make sure we get past the loading splash page
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

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
  await mockBackendState(page, { ui_tree: testingUiTree, language: "R" });

  await page.goto("/");

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
