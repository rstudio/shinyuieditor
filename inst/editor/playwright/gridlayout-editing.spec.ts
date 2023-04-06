import { expect, test } from "@playwright/test";

import type { ShinyUiNode } from "../src/main";

import { dragInDir } from "./utils/dragInDir";
import { mockBackendState } from "./utils/mockBackend";

const basicGridApp: ShinyUiNode = {
  id: "gridlayout::grid_page",
  namedArgs: {
    layout: ["A B", "C ."],
    row_sizes: ["100px", "1fr"],
    col_sizes: ["200px", "2fr"],
    gap_size: "12px",
  },
  children: [
    {
      id: "gridlayout::grid_card",
      namedArgs: { area: "A" },
      children: [
        {
          id: "bslib::card_header",
          namedArgs: {},
          children: [{ id: "textNode", namedArgs: { contents: "A" } }],
        },
      ],
    },
    {
      id: "gridlayout::grid_card",
      namedArgs: {
        area: "B",
      },
      children: [
        {
          id: "bslib::card_header",
          namedArgs: {},
          children: [{ id: "textNode", namedArgs: { contents: "B" } }],
        },
      ],
    },
    {
      id: "gridlayout::grid_card",
      namedArgs: {
        area: "C",
      },
      children: [{ id: "textNode", namedArgs: { contents: "C" } }],
    },
  ],
};

test("Can resize tracts of the layout by dragging", async ({ page }) => {
  await mockBackendState(page, basicGridApp);

  await page.goto("/");

  // Make sure we get past the loading splash page
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  // ====== Test that we can resize tracts of the layout by dragging =======
  const cardASelector = page.locator(`[data-sue-path="0"]`);

  const cardAPreWidth = (await cardASelector.boundingBox())?.width as number;
  expect(cardAPreWidth).not.toBeUndefined();

  const resizePxAmnt = 50;
  await dragInDir(page, page.getByTitle(`resize columns 1 and 2`), {
    x_px: resizePxAmnt,
  });
  const cardAPostWidth = (await cardASelector.boundingBox())?.width as number;
  expect(cardAPostWidth).not.toBeUndefined();
  // We snap to a grid so as long as we're within 6 pixels of where we should be
  // we count that as a successful resizing
  expect(Math.abs(cardAPostWidth - cardAPreWidth - resizePxAmnt)).toBeLessThan(
    6
  );
});

test("Can update the positions of cards by dragging edges", async ({
  page,
}) => {
  await mockBackendState(page, basicGridApp);

  await page.goto("/");

  // Make sure we get past the loading splash page
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  // Select the B card (doing this so it's easier to query for its size)
  await page.getByText(/^B$/).click();
  // Now make sure we've selected the card itself not one of its elements
  await page
    .locator(`[aria-label="Path to selected node"]`)
    .getByText(/grid card/i)
    .click();

  const cardSelector = page.locator(`[data-is-selected-node="true"]`);
  const startingCardHeight = (await cardSelector.boundingBox())!.height;
  await dragInDir(page, page.getByTitle(`resize B down`), {
    y_px: 50,
  });

  const endingCardHeight = (await cardSelector.boundingBox())!.height;

  expect(startingCardHeight).toBeLessThan(endingCardHeight);
});
