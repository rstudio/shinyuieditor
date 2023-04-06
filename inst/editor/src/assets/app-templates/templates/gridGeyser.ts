import type { TemplateInfo } from "communication-types/src/AppTemplates";

import type { ShinyUiNode } from "../../../main";

const appTree: ShinyUiNode = {
  id: "gridlayout::grid_page",
  uiArguments: {
    layout: [
      "header  header   header",
      "sidebar bluePlot bluePlot",
      "table   table    plotly",
      "table   table    plotly",
    ],
    row_sizes: ["100px", "1fr", "1fr", "1fr"],
    col_sizes: ["250px", "0.59fr", "1.41fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      id: "gridlayout::grid_card",
      uiArguments: { area: "sidebar" },
      uiChildren: [
        {
          id: "bslib::card_header",
          uiArguments: {},
          uiChildren: [
            {
              id: "textNode",
              uiArguments: {
                contents: "Settings",
              },
            },
          ],
        },
        {
          id: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [
            {
              id: "shiny::sliderInput",
              uiArguments: {
                inputId: "bins",
                label: "Number of Bins",
                min: 12,
                max: 100,
                value: 30,
                width: "100%",
              },
            },
            {
              id: "shiny::numericInput",
              uiArguments: {
                inputId: "numRows",
                label: "Number of table rows",
                value: 10,
                min: 1,
                step: 1,
                width: "100%",
              },
            },
          ],
        },
      ],
    },
    {
      id: "gridlayout::grid_card_text",
      uiArguments: {
        area: "header",
        content: "Geysers!",
        alignment: "start",
        is_title: false,
      },
    },
    {
      id: "gridlayout::grid_card",
      uiArguments: {
        area: "table",
      },
      uiChildren: [
        {
          id: "bslib::card_header",
          uiArguments: {},
          uiChildren: [
            {
              id: "textNode",
              uiArguments: {
                contents: "Table",
              },
            },
          ],
        },
        {
          id: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [
            {
              id: "DT::DTOutput",
              uiArguments: {
                outputId: "myTable",
                width: "100%",
              },
            },
          ],
        },
      ],
    },
    {
      id: "gridlayout::grid_card_plot",
      uiArguments: {
        area: "bluePlot",
      },
    },
    {
      id: "gridlayout::grid_card",
      uiArguments: { area: "plotly" },
      uiChildren: [
        {
          id: "bslib::card_header",
          uiArguments: {},
          uiChildren: [
            {
              id: "textNode",
              uiArguments: {
                contents: "Interactive Plot",
              },
            },
          ],
        },
        {
          id: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [
            {
              id: "plotly::plotlyOutput",
              uiArguments: {
                outputId: "distPlot",
                width: "100%",
                height: "100%",
              },
            },
          ],
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
    serverLibraries: ["plotly"],
    serverFunctionBody: ` 
output$distPlot <- renderPlotly({
  # generate bins based on input$bins from ui.R
  plot_ly(x = ~ faithful[, 2], type = "histogram")
})

output$bluePlot <- renderPlot({
  # generate bins based on input$bins from ui.R
  x <- faithful[, 2]
  bins <- seq(min(x), max(x), length.out = input$bins + 1)

  # draw the histogram with the specified number of bins
  hist(x, breaks = bins, col = "steelblue", border = "white")
})

output$myTable <- renderDT({
  head(faithful, input$numRows)
})`,
  },
};
