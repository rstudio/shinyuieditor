/**
 * Basic grid app with a sidebar containging a slider and plot
 */

import type { ShinyUiNode } from "../main";
import type { TemplateChooserNode } from "../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const basicGridPage: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    layout: ["header header", "sidebar plot", "sidebar plot"],
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
        {
          uiName: "unknownUiFunction",
          uiArguments: {
            text: `myCoolCustomRFunction(arg1, arg2)`,
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

/**
 * Super basic grid app tree for when running e2e tests
 */
export const testingUiTree: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    layout: [". .", ". ."],
    row_sizes: ["1fr", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [],
};

/**
 * Basic navbar page with tabs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const basicNavbarPage: ShinyUiNode = {
  uiName: "shiny::navbarPage",
  uiArguments: {
    title: "My Navbar Page",
    collapsible: false,
  },
  uiChildren: [
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Settings",
      },
      uiChildren: [
        {
          uiName: "shiny::tabsetPanel",
          uiArguments: {},
        },
      ],
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Plot 1",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Plot 2",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "MyOtherPlot",
            width: "50%",
            height: "50%",
          },
        },
      ],
    },
  ],
};

export const minimalPage: ShinyUiNode = {
  uiName: "shiny::navbarPage",
  uiArguments: {
    title: "My Navbar Page",
    collapsible: false,
  },
  uiChildren: [
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Plot 1",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
  ],
};

// To enable different app templates just uncomment the tree you want here

export const templateChooserMode: TemplateChooserNode = "TEMPLATE_CHOOSER";

// export const sampleAppTree = basicGridPage;
export const sampleAppTree = templateChooserMode;
// export const sampleAppTree = basicNavbarPage;
// export const sampleAppTree = minimalPage;
