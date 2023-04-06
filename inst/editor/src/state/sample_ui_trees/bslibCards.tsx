import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const bslibCards = {
  id: "gridlayout::grid_page",
  uiArguments: {
    layout: ["info  info    ", "empty onlyBody", "full  .    "],
    row_sizes: ["70px", "200px", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      id: "gridlayout::grid_card",
      uiArguments: { area: "empty" },
      uiChildren: [
        {
          id: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [

            {
              id: "bslib::value_box",
              uiArguments: { title: "Value Box", showcase_icon: "github", value:{
                id:"textNode",
                uiArguments: {
                  contents: "Lorem Ipsum",
                }
              } },
              uiChildren: [],
            },
          ],
        }
      ],
    },
    {
      id: "gridlayout::grid_card_text",
      uiArguments: {
        content: "Example of super simple bslib cards",
        alignment: "start",
        area: "info",
      },
    },
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
                size: "default",
              },
            },
          ],
        },
      ],
    },
    {
      id: "gridlayout::grid_card",
      uiArguments: { area: "full" },
      uiChildren: [
        {
          id: "bslib::card_header",
          uiArguments: {},
          uiChildren: [
            {
              id: "textNode",
              uiArguments: {
                contents: "I am a text node!",
              },
            },
          ],
        },
        {
          id: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [],
        },
        {
          id: "bslib::card_footer",
          uiArguments: {},
          uiChildren: [],
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;
