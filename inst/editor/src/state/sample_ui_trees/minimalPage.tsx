import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

export const minimalPage = {
  id: "shiny::navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: false,
  },
  uiChildren: [
    {
      id: "shiny::tabPanel",
      namedArgs: {
        title: "Plot 1",
      },
      uiChildren: [
        {
          id: "shiny::plotOutput",
          namedArgs: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;
