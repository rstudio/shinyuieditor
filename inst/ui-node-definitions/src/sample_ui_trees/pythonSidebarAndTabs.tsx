/**
 * Basic navbar page with tabs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

export const pythonSidebarAndTabs = {
  id: "navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: false,
  },
  children: [
    {
      id: "tabPanel",
      namedArgs: {
        title: "plot",
      },
      children: [
        {
          id: "layout_sidebar",
          namedArgs: {
            sidebar: {
              id: "sidebar",
              namedArgs: {
                title: "My Sidebar",
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
            main: {
              id: "panel_main",
              namedArgs: {},
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
          },
          children: [],
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;
