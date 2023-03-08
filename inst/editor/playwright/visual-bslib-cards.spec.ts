import { test, expect } from "@playwright/test";

import type { ShinyUiNode } from "../src/main";

import { mockBackendState } from "./utils/mockBackend";
const shortCardTree: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    layout: ["onlyBody", ".       "],
    row_sizes: ["165px", "1fr"],
    col_sizes: ["1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::grid_card",
      uiArguments: {
        area: "onlyBody",
      },
      uiChildren: [
        {
          uiName: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [
            {
              uiName: "shiny::textInput",
              uiArguments: {
                inputId: "myText",
                label: "Text Input",
                value: "Some Text",
              },
            },
            {
              uiName: "shiny::checkboxGroupInput",
              uiArguments: {
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
              uiName: "shiny::radioButtons",
              uiArguments: {
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
          uiName: "bslib::card_footer",
          uiArguments: {},
          uiChildren: [
            {
              uiName: "textNode",
              uiArguments: {
                contents: "Lorem Ipsum",
                decoration: "default",
                size: "span",
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
