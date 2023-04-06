import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const bslibCards = {
  id: "gridlayout::grid_page",
  namedArgs: {
    layout: ["info  info    ", "empty onlyBody", "full  .    "],
    row_sizes: ["70px", "200px", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  children: [
    {
      id: "gridlayout::grid_card",
      namedArgs: { area: "empty" },
      children: [
        {
          id: "bslib::card_body_fill",
          namedArgs: {},
          children: [

            {
              id: "bslib::value_box",
              namedArgs: { title: "Value Box", showcase_icon: "github", value:{
                id:"textNode",
                namedArgs: {
                  contents: "Lorem Ipsum",
                }
              } },
              children: [],
            },
          ],
        }
      ],
    },
    {
      id: "gridlayout::grid_card_text",
      namedArgs: {
        content: "Example of super simple bslib cards",
        alignment: "start",
        area: "info",
      },
    },
    {
      id: "gridlayout::grid_card",
      namedArgs: {
        area: "onlyBody",
      },
      children: [
        {
          id: "bslib::card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "shiny::textInput",
              namedArgs: {
                inputId: "myText",
                label: "Text Input",
                value: "Some Text",
              },
            },
            {
              id: "shiny::checkboxGroupInput",
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
              id: "shiny::radioButtons",
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
          id: "bslib::card_footer",
          namedArgs: {},
          children: [
            {
              id: "textNode",
              namedArgs: {
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
      namedArgs: { area: "full" },
      children: [
        {
          id: "bslib::card_header",
          namedArgs: {},
          children: [
            {
              id: "textNode",
              namedArgs: {
                contents: "I am a text node!",
              },
            },
          ],
        },
        {
          id: "bslib::card_body_fill",
          namedArgs: {},
          children: [],
        },
        {
          id: "bslib::card_footer",
          namedArgs: {},
          children: [],
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;
