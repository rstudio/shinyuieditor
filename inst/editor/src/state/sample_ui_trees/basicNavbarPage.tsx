import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

/**
 * Basic navbar page with tabs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const basicNavbarPage = {
  id: "shiny::navbarPage",
  uiArguments: {
    title: "My Navbar Page",
    collapsible: false,
  },
  uiChildren: [
    {
      id: "shiny::tabPanel",
      uiArguments: {
        title: "Settings",
      },
      uiChildren: [
        {
          id: "shiny::tabsetPanel",
          uiArguments: {},
          uiChildren: [],
        },
      ],
    },
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
    {
      id: "shiny::tabPanel",
      uiArguments: {
        title: "Plot 2",
      },
      uiChildren: [
        {
          id: "shiny::plotOutput",
          uiArguments: {
            outputId: "MyOtherPlot",
            width: "50%",
            height: "50%",
          },
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;
