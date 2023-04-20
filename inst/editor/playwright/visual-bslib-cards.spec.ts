import { expect, test } from "@playwright/test";

import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import { mockBackendState } from "./utils/mockBackend";
const shortCardTree: KnownShinyUiNode = {
  id: "grid_page",
  namedArgs: {
    layout: ["onlyBody", ".       "],
    row_sizes: ["165px", "1fr"],
    col_sizes: ["1fr"],
    gap_size: "1rem",
  },
  children: [
    {
      id: "grid_card",
      namedArgs: {
        area: "onlyBody",
      },
      children: [
        {
          id: "card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "textInput",
              namedArgs: {
                inputId: "myText",
                label: "Text Input",
                value: "Some Text",
              },
            },
            {
              id: "checkboxGroupInput",
              namedArgs: {
                inputId: "myCheckboxGroup",
                label: "Checkbox Group",
                choices: {
                  "choice a": "a",
                  "choice b": "b",
                },
                width: "100%",
              },
            },
            {
              id: "radioButtons",
              namedArgs: {
                inputId: "myRadioButtons",
                label: "Radio Buttons",
                choices: {
                  "choice a": "a",
                  "choice b": "b",
                },
                width: "100%",
              },
            },
          ],
        },
        {
          id: "card_footer",
          namedArgs: {},
          children: [
            {
              id: "textNode",
              namedArgs: {
                contents: "Lorem Ipsum",
                decoration: "default",
              },
            },
          ],
        },
      ],
    },
  ],
};

test("Make sure cards with too much content don't overflow visually", async ({
  page,
}) => {
  await mockBackendState(page, shortCardTree);

  await page.goto("/");

  // Make sure we get past the loading splash page
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  await expect(page).toHaveScreenshot();
});
