import { test, expect } from "@playwright/test";

import type { ShinyUiNode } from "../src/Shiny-Ui-Elements/uiNodeTypes";

import { dragDrop } from "./utils/dragDrop";
import { mockBackendState } from "./utils/mockBackend";

const basicNavbarPage: ShinyUiNode = {
  id: "shiny::navbarPage",
  uiArguments: {
    title: "My Navbar Page",
    collapsible: true,
  },
  uiChildren: [
    {
      id: "shiny::tabPanel",
      uiArguments: {
        title: "Settings",
      },
      uiChildren: [
        {
          id: "shiny::actionButton",
          uiArguments: {
            label: "Do something",
            inputId: "btn",
          },
        },
      ],
    },
    {
      id: "shiny::tabPanel",
      uiArguments: {
        title: "Plot 1",
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
        title: "Plot 2",
      },
      uiChildren: [
        {
          id: "shiny::plotOutput",
          uiArguments: {
            outputId: "MyOtherPlot",
            width: "50%",
            height: "50%",
          },
        },
      ],
    },
  ],
};

test("Basic usage of navbar page", async ({ page }) => {
  await mockBackendState(page, basicNavbarPage);

  await page.goto("/");

  // First we switch to a different tab
  await page.locator(`[aria-label="shiny::navbarPage"] >> text=Plot 1`).click();

  // Now we select the element contained within that tab
  await page
    .locator(`[aria-label="tab panel Plot 1"] [aria-label="shiny::plotOutput"]`)
    .click();

  // Next we delete that element
  await page.locator("text=Delete Element").click();

  // Now we drag a new dynamic ui output into the now empty tab
  await dragDrop(
    page,
    "text=/^Dynamic UI Output$/",
    `[aria-label="tab panel Plot 1"]`
  );

  // Rename tab
  const newTabName = "Random Name";

  // Click the tab to set selection to tab panel itself
  await page.locator("text=Plot 1").click();

  const titleInput = page.locator(`[aria-label="Title of panel"]`);
  await titleInput.fill(newTabName);

  // Now there should be a tab with the new name and not a tab with the old
  // name. The text= selector doesn't reach into inputs so a single
  // .toBeVisible() is enough here.
  await expect(page.locator(`text=${newTabName}`)).toBeVisible();

  await expect(page.locator(`text=Plot 1`)).not.toBeVisible();

  // Add a new tab with a select input by dragging it onto the new tab button
  await dragDrop(page, "text=/^Select Input$/", `[aria-label="Add new tab"]`);

  // Make sure that the newly added tab is visible
  await expect(
    page.locator(`[aria-label = "shiny::selectInput"]`)
  ).toBeVisible();

  await expect(
    page.locator(`[aria-label = "shiny::plotOutput"]`)
  ).not.toBeVisible();

  // Add a new empty tab panel by clicking the new tab button
  await page.locator(`button[aria-label="Add new tab"]`).click();

  const openTabSelector = `[data-active-tab="true"] [aria-label="shiny::tabPanel"]`;
  const childrenOfOpenTabLocator = page
    .locator(openTabSelector)
    .locator(`[data-sue-path]`);

  // The tab should be empty: Aka have no ui node children
  await expect(childrenOfOpenTabLocator).toHaveCount(0);

  // However if we drag and drop something into it, there will be children
  await dragDrop(page, "text=/^Checkbox Group$/", openTabSelector);
  await expect(childrenOfOpenTabLocator).toHaveCount(1);

  // Deleting a tab panel will remove that tab from the tabset

  // Take note of how many tabs we start with...
  const tabsLocator = page.locator(
    `[aria-label="tabs container"] > *:not([aria-label="tab drop detector"])`
  );
  const numTabs = await tabsLocator.count();

  // Now we select the dynamic ui tab and click delete element button to remove it
  await page.locator(`[aria-label="Select ${newTabName} tab"]`).click();

  await page.locator("text=Delete Element").click();

  // The number of tabs should have decreased by one
  await expect(tabsLocator).toHaveCount(numTabs - 1);
});
