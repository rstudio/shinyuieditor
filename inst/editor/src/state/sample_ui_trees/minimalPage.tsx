import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

export const minimalPage = {
  id: "shiny::navbarPage",
  uiArguments: {
    title: "My Navbar Page",
    collapsible: false,
  },
  uiChildren: [
    {
      id: "shiny::tabPanel",
      uiArguments: {
        title: "Plot 1",
      },
      uiChildren: [
        {
          id: "shiny::plotOutput",
          uiArguments: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;
