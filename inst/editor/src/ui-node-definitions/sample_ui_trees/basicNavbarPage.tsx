/**
 * Basic navbar page with tabs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { collapseText } from "util-functions/src/strings";

import type { KnownShinyUiNode } from "../uiNodeTypes";

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
          id: "markdown",
          namedArgs: {
            mds: collapseText(
              `## My Settings`,
              "Use the following settings to mess with things"
            ),
          },
        },
        {
          id: "actionButton",
          namedArgs: {
            inputId: "myButton",
            label: "My Button",
          },
        },
        {
          id: "radioButtons",
          namedArgs: {
            inputId: "myRadio",
            label: "My Radio",
            choices: {
              "Choice 1": "choice1",
              "Choice 2": "choice2",
              "Choice 3": "choice3",
            },
          },
        },
      ],
    },
  },
  children: [
    {
      id: "nav_panel",
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
      id: "nav_panel",
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
