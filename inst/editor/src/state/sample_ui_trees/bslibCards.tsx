import type { ShinyUiParentNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const bslibCards: ShinyUiParentNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    layout: ["info  info    ", "empty onlyBody", "full  .    "],
    row_sizes: ["70px", "200px", "1fr"],
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
