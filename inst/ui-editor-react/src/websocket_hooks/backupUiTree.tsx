import { TESTING_MODE } from "env_variables";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

// Ui Tree used if there's no backend connection
export const basicGridPage: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      ["header", "header"],
      ["sidebar", "plot"],
      ["sidebar", "plot"],
    ],
    row_sizes: ["100px", "1fr", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::grid_card_text",
      uiArguments: {
        area: "header",
        content: "My App",
        alignment: "start",
        is_title: true,
      },
    },
    {
      uiName: "gridlayout::grid_card",
      uiArguments: {
        area: "sidebar",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "Slider",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          uiName: "shiny::numericInput",
          uiArguments: {
            inputId: "myNumericInput",
            label: "Numeric Input",
            min: 2,
            max: 11,
            value: 7,
            width: "100%",
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_card_plot",
      uiArguments: {
        area: "plot",
      },
    },
  ],
};

// Super basic tree for when running e2e tests
const testingUiTree: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      [".", "."],
      [".", "."],
    ],
    row_sizes: ["1fr", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [],
};

export const backupUiTree = TESTING_MODE ? testingUiTree : basicGridPage;
