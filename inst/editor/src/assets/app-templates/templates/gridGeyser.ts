import type { TemplateInfo } from "communication-types/src/AppTemplates";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

const appTree: ShinyUiNode = {
  id: "grid_page",
  namedArgs: {
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
  children: [
    {
      id: "grid_card",
      namedArgs: { area: "sidebar" },
      children: [
        {
          id: "card_header",
          namedArgs: {},
          children: [
            {
              id: "textNode",
              namedArgs: {
                contents: "Settings",
              },
            },
          ],
        },
        {
          id: "card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "sliderInput",
              namedArgs: {
                inputId: "bins",
                label: "Number of Bins",
                min: 12,
                max: 100,
                value: 30,
                width: "100%",
              },
            },
            {
              id: "numericInput",
              namedArgs: {
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
      id: "grid_card_text",
      namedArgs: {
        area: "header",
        content: "Geysers!",
        alignment: "start",
        is_title: false,
      },
    },
    {
      id: "grid_card",
      namedArgs: {
        area: "table",
      },
      children: [
        {
          id: "card_header",
          namedArgs: {},
          children: [
            {
              id: "textNode",
              namedArgs: {
                contents: "Table",
              },
            },
          ],
        },
        {
          id: "card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "DTOutput",
              namedArgs: {
                outputId: "myTable",
                width: "100%",
              },
            },
          ],
        },
      ],
    },
    {
      id: "grid_card_plot",
      namedArgs: {
        area: "bluePlot",
      },
    },
    {
      id: "grid_card",
      namedArgs: { area: "plotly" },
      children: [
        {
          id: "card_header",
          namedArgs: {},
          children: [
            {
              id: "textNode",
              namedArgs: {
                contents: "Interactive Plot",
              },
            },
          ],
        },
        {
          id: "card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "plotlyOutput",
              namedArgs: {
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
