import { expect, test } from "@playwright/test";

import type { KnownShinyUiNode } from "../src/Shiny-Ui-Elements/uiNodeTypes";

import { mockBackendState } from "./utils/mockBackend";
const shortCardTree: KnownShinyUiNode = {
  id: "gridlayout::grid_page",
  uiArguments: {
    layout: ["onlyBody", ".       "],
    row_sizes: ["165px", "1fr"],
    col_sizes: ["1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      id: "gridlayout::grid_card",
      uiArguments: {
        area: "onlyBody",
      },
      uiChildren: [
        {
          id: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [
            {
              id: "shiny::textInput",
              uiArguments: {
                inputId: "myText",
                label: "Text Input",
                value: "Some Text",
              },
            },
            {
              id: "shiny::checkboxGroupInput",
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
              id: "shiny::radioButtons",
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
          id: "bslib::card_footer",
          uiArguments: {},
          uiChildren: [
            {
              id: "textNode",
              uiArguments: {
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
