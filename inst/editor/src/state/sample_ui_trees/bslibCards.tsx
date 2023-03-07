import type { ShinyUiNode } from "../../main";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const bslibCards: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    layout: ["info  info    ", "empty onlyBody", "full  .    "],
    row_sizes: ["70px", "1fr", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::grid_card_text",
      uiArguments: {
        content: "Example of super simple bslib cards",
        alignment: "start",
        area: "info",
      },
    },
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
          ],
        },
      ],
    },
    {
      uiName: "gridlayout::grid_card",
      uiArguments: { area: "empty" },
      uiChildren: [],
    },
    {
      uiName: "gridlayout::grid_card",
      uiArguments: { area: "full" },
      uiChildren: [
        {
          uiName: "bslib::card_header",
          uiArguments: {},
          uiChildren: [
            {
              uiName: "textNode",
              uiArguments: {
                contents: "I am a text node!",
              },
            },
          ],
        },
        {
          uiName: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [],
        },
        {
          uiName: "bslib::card_footer",
          uiArguments: {},
          uiChildren: [],
        },
      ],
    },
  ],
};
