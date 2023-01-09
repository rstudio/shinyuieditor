import { expect, test } from "@playwright/test";

import type { ShinyUiNode } from "../src/Shiny-Ui-Elements/uiNodeTypes";

import { mockBackendState } from "./utils/mockBackend";

const basicNavbarPage: ShinyUiNode = {
  uiName: "shiny::navbarPage",
  uiArguments: {
    title: "My Navbar Page",
    collapsible: true,
  },
  uiChildren: [
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Settings",
      },
      uiChildren: [
        {
          uiName: "shiny::actionButton",
          uiArguments: {
            label: "Do something",
            inputId: "btn",
          },
        },
      ],
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Plot 1",
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
        title: "Plot 2",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
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

const onMac = process.platform === "darwin";
const undoKeys = `${onMac ? "Meta" : "Control"}+z`;
const redoKeys = `${onMac ? "Meta" : "Control"}+Shift+z`;

test("Can delete elements and undo/redo those changes with keyboard shortcuts", async ({
  page,
}) => {
  await mockBackendState(page, basicNavbarPage);

  await page.goto("/");

  const plotTab = page.locator(
    `[aria-label="shiny::navbarPage"] >> text=Plot 1`
  );
  // First we switch to a different tab
  await plotTab.click();

  // Delete tab with delete key
  await page.keyboard.press("Backspace");

  await expect(plotTab).not.toBeVisible();

  // Now undo change with control z
  await page.keyboard.press(undoKeys);

  await expect(plotTab).toBeVisible();

  // Last, redo changes
  await page.keyboard.press(redoKeys);
  await expect(plotTab).not.toBeVisible();
});
