import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

/**
 * Basic navbar page with tabs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const basicNavbarPage = {
  id: "shiny::navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: false,
  },
  children: [
    {
      id: "shiny::tabPanel",
      namedArgs: {
        title: "Settings",
      },
      children: [
        {
          id: "shiny::tabsetPanel",
          namedArgs: {},
          children: [],
        },
      ],
    },
    {
      id: "shiny::tabPanel",
      namedArgs: {
        title: "Plot 1",
      },
      children: [
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
    {
      id: "shiny::tabPanel",
      namedArgs: {
        title: "Plot 2",
      },
      children: [
        {
          id: "shiny::plotOutput",
          namedArgs: {
            outputId: "MyOtherPlot",
            width: "50%",
            height: "50%",
          },
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;
