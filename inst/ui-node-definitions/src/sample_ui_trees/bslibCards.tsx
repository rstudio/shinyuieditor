// eslint-disable-next-line @typescript-eslint/no-unused-vars

import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

export const bslibCards = {
  id: "grid_page",
  namedArgs: {
    layout: ["info  info    ", "empty onlyBody", "full  .    "],
    row_sizes: ["70px", "200px", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  children: [
    {
      id: "grid_card",
      namedArgs: { area: "empty" },
      children: [
        {
          id: "card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "value_box",
              namedArgs: {
                title: "Value Box",
                showcase_icon: "github",
                value: {
                  id: "textNode",
                  namedArgs: {
                    contents: "Lorem Ipsum",
                  },
                },
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "grid_card_text",
      namedArgs: {
        content: "Example of super simple bslib cards",
        alignment: "start",
        area: "info",
      },
    },
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
                size: "default",
              },
            },
          ],
        },
      ],
    },
    {
      id: "grid_card",
      namedArgs: { area: "full" },
      children: [
        {
          id: "card_header",
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
          id: "card_body_fill",
          namedArgs: {},
          children: [],
        },
        {
          id: "card_footer",
          namedArgs: {},
          children: [],
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;
