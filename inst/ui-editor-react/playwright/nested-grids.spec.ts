import { test, expect } from "@playwright/test";

import type { ShinyUiNode } from "../src/Shiny-Ui-Elements/uiNodeTypes";

const basicNavbarPage: ShinyUiNode = {
  uiName: "shiny::navbarPage",
  uiArguments: {
    title: "Site Title",
    collapsible: false,
  },
  uiChildren: [
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Plot",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Grid Tab",
      },
      uiChildren: [
        {
          uiName: "gridlayout::grid_container",
          uiArguments: {
            areas: [["button", "button"]],
            row_sizes: ["1fr"],
            col_sizes: ["1fr", "1fr"],
            gap_size: "1rem",
          },
          uiChildren: [
            {
              uiName: "gridlayout::grid_card",
              uiArguments: {
                area: "button",
              },
              uiChildren: [
                {
                  uiName: "shiny::actionButton",
                  uiArguments: {
                    inputId: "myButton",
                    label: "My Button",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

test("Basic usage of navbar page", async ({ page }) => {
  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(basicNavbarPage),
    })
  );

  await page.goto("/");

  // Navigate to the nested grid tab
  await page
    .locator(`[aria-label="shiny::navbarPage"] >> text=Grid Tab`)
    .click();

  // Select the grid container child of tab
  await page.locator(`[aria-label="gridlayout::grid_card"]`).click();

  await expect(
    page
      .locator(`[aria-label="Path to selected node"]`)
      .locator(`[aria-label="current selection"]`)
  ).toHaveText("Grid Card");

  await expect(
    page.locator(`[aria-label="gridlayout::grid_card"]`)
  ).not.toHaveCSS("grid-area", /updated/i);

  // Update grid area name
  await page.locator(`[aria-label="input for area"]`).click({ clickCount: 3 });
  await page.locator(`[aria-label="input for area"]`).type("updated");

  await expect(page.locator(`[aria-label="gridlayout::grid_card"]`)).toHaveCSS(
    "grid-area",
    /updated/i
  );
});
