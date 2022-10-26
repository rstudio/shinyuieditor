import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type { TemplateInfo } from "../TemplatePreviewCard";

const appTree = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    row_sizes: ["100px", "1fr", "1fr", "1fr"],
    col_sizes: ["505px", "1fr"],
    gap_size: "1rem",
    areas: [
      ["header", "header"],
      ["sidebar", "area4"],
      ["table", "bluePlot"],
      ["table", "bluePlot"],
    ],
  },
  uiChildren: [
    {
      uiName: "gridlayout::grid_card",
      uiArguments: {
        area: "sidebar",
        item_alignment: "top",
        title: "Settings",
        item_gap: "12px",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "bins",
            label: "Number of Bins",
            min: 12,
            max: 100,
            value: 30,
            animate: {
              uiName: "unknownUiFunction",
              uiArguments: {
                text: 'animationOptions(interval = 1000, loop = FALSE, playButton = "play", \n    pauseButton = "pause")',
              },
            },
            width: "100%",
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_card_text",
      uiArguments: {
        area: "header",
        content: "Single File App",
        alignment: "start",
        is_title: false,
      },
    },
    {
      uiName: "gridlayout::grid_card",
      uiArguments: {
        area: "table",
        item_alignment: "center",
        title: "Table",
        scrollable: true,
        item_gap: "12px",
      },
      uiChildren: [
        {
          uiName: "DT::DTOutput",
          uiArguments: {
            outputId: "myTable",
            width: "100%",
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_card_plot",
      uiArguments: {
        area: "bluePlot",
      },
    },
    {
      uiName: "gridlayout::grid_card",
      uiArguments: {
        area: "area4",
      },
      uiChildren: [
        {
          uiName: "plotly::plotlyOutput",
          uiArguments: {
            outputId: "distPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
  ],
};

export const gridGeyserTemplate: TemplateInfo = {
  title: "Grid Geyser",
  description: "The classic geyser app in a gridlayout grid page",
  uiTree: appTree as ShinyUiNode,
  otherCode: {
    serverFunctionBody: ` 
    output$distPlot <- renderPlotly({
      # generate bins based on input$bins from ui.R
      plot_ly(x = ~faithful[, 2], type = "histogram")
  
      # # draw the histogram with the specified number of bins
      # hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  
    output$bluePlot <- renderPlot({
      # generate bins based on input$bins from ui.R
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
  
      # draw the histogram with the specified number of bins
      hist(x, breaks = bins, col = 'steelblue', border = 'white')
    })
  
  
    output$myTable <- renderDT(
      {
        head(faithful, 10)
      }
    )`,
  },
};
