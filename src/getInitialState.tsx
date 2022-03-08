import { ShinyUiNode } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

export async function getInitialState(): Promise<ShinyUiNode> {
  const response = await fetch("app-please", { method: "GET" });

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return backupState;
  }

  return await response.json();
}

const backupState: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      ["header", "header"],
      ["sidebar", "plot"],
      ["sidebar", "plot"],
    ],
    rowSizes: ["100px", "1fr", "1fr"],
    colSizes: ["250px", "1fr"],
    gapSize: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        area: "header",
        title: "My App",
      },
    },
    {
      uiName: "gridlayout::vertical_stack_panel",
      uiArguments: {
        area: "sidebar",
        item_alignment: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider1",
            label: "Slider 1",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider2",
            label: "Slider 2",
            min: 1,
            max: 10,
            value: 3,
          },
        },
      ],
    },
    {
      uiName: "gridlayout::vertical_stack_panel",
      uiArguments: {
        area: "plot",
        item_alignment: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot",
          },
        },
      ],
    },
  ],
};
