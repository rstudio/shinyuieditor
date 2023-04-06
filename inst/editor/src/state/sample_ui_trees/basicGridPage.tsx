import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const basicGridPage: KnownShinyUiNode = {
  id: "gridlayout::grid_page",
  uiArguments: {
    layout: ["header header", "sidebar plot", "sidebar plot"],
    row_sizes: ["100px", "1fr", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      id: "gridlayout::grid_card_text",
      uiArguments: {
        area: "header",
        content: "My App",
        alignment: "start",
        is_title: true,
      },
    },
    {
      id: "gridlayout::grid_card",
      uiArguments: {
        area: "sidebar",
      },
      uiChildren: [
        {
          id: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "Slider",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          id: "shiny::numericInput",
          uiArguments: {
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
          uiArguments: {
            text: `myCoolCustomRFunction(arg1, arg2)`,
          },
        },
      ],
    },
    {
      id: "gridlayout::grid_card_plot",
      uiArguments: {
        area: "plot",
      },
    },
  ],
};
