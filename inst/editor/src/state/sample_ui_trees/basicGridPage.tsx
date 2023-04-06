import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const basicGridPage: KnownShinyUiNode = {
  id: "gridlayout::grid_page",
  namedArgs: {
    layout: ["header header", "sidebar plot", "sidebar plot"],
    row_sizes: ["100px", "1fr", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      id: "gridlayout::grid_card_text",
      namedArgs: {
        area: "header",
        content: "My App",
        alignment: "start",
        is_title: true,
      },
    },
    {
      id: "gridlayout::grid_card",
      namedArgs: {
        area: "sidebar",
      },
      uiChildren: [
        {
          id: "shiny::sliderInput",
          namedArgs: {
            inputId: "mySlider",
            label: "Slider",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          id: "shiny::numericInput",
          namedArgs: {
            inputId: "myNumericInput",
            label: "Numeric Input",
            min: 2,
            max: 11,
            value: 7,
            width: "100%",
          },
        },
        {
          id: "unknownUiFunction",
          namedArgs: {
            text: `myCoolCustomRFunction(arg1, arg2)`,
          },
        },
      ],
    },
    {
      id: "gridlayout::grid_card_plot",
      namedArgs: {
        area: "plot",
      },
    },
  ],
};
