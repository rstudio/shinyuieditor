import type { TemplateInfo } from "communication-types/src/AppTemplates";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

const appTree: ShinyUiNode = {
  id: "grid_page",
  namedArgs: {
    layout: ["header  header  ", "sidebar plot "],
    row_sizes: ["100px", "1fr"],
    col_sizes: ["250px", "1fr"],
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
          id: "card_body",
          namedArgs: {},
          children: [
            {
              id: "selectInput",
              namedArgs: {
                inputId: "cut",
                label: "Cut of Diamond",
                choices: {
                  Fair: "Fair",
                  Good: "Good",
                  Very_Good: "Very Good",
                  Premium: "Premium",
                  Ideal: "Ideal",
                },
                selected: "Ideal",
                width: "100%",
              },
            },
            {
              id: "textNode",
              namedArgs: {
                contents:
                  "Select the cut of the diamond you want to view the carat size distribution for.",
                decoration: "italic",
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
        content: "Diamonds!",
        alignment: "start",
        is_title: false,
      },
    },
    {
      id: "grid_card",
      namedArgs: { area: "plot" },
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
          id: "card_body",
          namedArgs: {},
          children: [
            {
              id: "plotlyOutput",
              namedArgs: {
                outputId: "plot",
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

export const sidebarPlotGridTemplate: TemplateInfo = {
  title: "Sidebar Plotly",
  description:
    "The classic geyser app in a gridlayout grid pag with a sidebar and a single large plot",
  uiTree: appTree as ShinyUiNode,
  otherCode: {
    serverLibraries: ["plotly"],
    serverFunctionBody: ` 
output$plot <- renderPlotly({
  plot_ly(
    diamonds[diamonds$cut == input$cut,], 
    x = ~carat
  ) |> 
  add_histogram() 
})
`,
  },
};
