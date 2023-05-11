/**
 * Basic navbar page with tabs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

export const basicNavbarPage = {
  id: "navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: false,
    sidebar: {
      id: "sidebar",
      namedArgs: {
        title: "My Sidebar",
      },
      children: [
        {
          id: "actionButton",
          namedArgs: {
            inputId: "myButton",
            label: "My Button",
          },
        },
      ],
    },
  },
  children: [
    {
      id: "tabPanel",
      namedArgs: {
        title: "Settings",
      },
      children: [
        {
          id: "sliderInput",
          namedArgs: {
            inputId: "inputId",
            label: "Slider Input",
            min: 0,
            max: 10,
            value: 5,
            width: "100%",
          },
        },
      ],
    },
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
