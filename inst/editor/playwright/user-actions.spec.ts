import { expect, test } from "@playwright/test";

import type { ShinyUiNode } from "../src/ui-node-definitions/ShinyUiNode";

import { mockBackendState } from "./utils/mockBackend";

const basicNavbarPage: ShinyUiNode = {
  id: "navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: true,
  },
  children: [
    {
      id: "tabPanel",
      namedArgs: {
        title: "Settings",
      },
      children: [
        {
          id: "actionButton",
          namedArgs: {
            label: "Do something",
            inputId: "btn",
          },
        },
      ],
    },
    {
      id: "tabPanel",
      namedArgs: {
        title: "Plot 1",
      },
      children: [
        {
          id: "plotOutput",
          namedArgs: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
    {
      id: "tabPanel",
      namedArgs: {
        title: "Plot 2",
      },
      children: [
        {
          id: "plotOutput",
          namedArgs: {
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
  await mockBackendState(page, { ui_tree: basicNavbarPage, language: "R" });

  await page.goto("/");

  const plotTab = page.locator(`[aria-label="navbarPage"] >> text=Plot 1`);
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
