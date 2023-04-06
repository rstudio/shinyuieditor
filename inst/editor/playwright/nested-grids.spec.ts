import { expect, test } from "@playwright/test";

import type { ShinyUiNode } from "../src/Shiny-Ui-Elements/uiNodeTypes";

import { mockBackendState } from "./utils/mockBackend";

const basicNavbarPage: ShinyUiNode = {
  id: "shiny::navbarPage",
  uiArguments: {
    title: "Site Title",
    collapsible: false,
  },
  uiChildren: [
    {
      id: "shiny::tabPanel",
      uiArguments: {
        title: "Plot",
      },
      uiChildren: [
        {
          id: "shiny::plotOutput",
          uiArguments: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
    {
      id: "shiny::tabPanel",
      uiArguments: {
        title: "Grid Tab",
      },
      uiChildren: [
        {
          id: "gridlayout::grid_container",
          uiArguments: {
            layout: ["button button"],
            row_sizes: ["1fr"],
            col_sizes: ["1fr", "1fr"],
            gap_size: "1rem",
          },
          uiChildren: [
            {
              id: "gridlayout::grid_card",
              uiArguments: {
                area: "button",
              },
              uiChildren: [
                {
                  id: "shiny::actionButton",
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

test("Updating the area name of a grid item propigates through rest of app properly", async ({
  page,
}) => {
  await mockBackendState(page, basicNavbarPage);

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
  await page.locator(`[aria-label="Name of grid area"]`).fill("updated");

  await expect(page.locator(`[aria-label="gridlayout::grid_card"]`)).toHaveCSS(
    "grid-area",
    /updated/i
  );
});
