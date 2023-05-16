import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

export const minimalPage = {
  id: "navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: false,
  },
  children: [
    {
      id: "tabPanel",
      namedArgs: {
        title: "Plot 1",
      },
      children: [
        {
          id: "plotOutput",
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