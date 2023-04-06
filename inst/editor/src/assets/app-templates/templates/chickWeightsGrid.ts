import type { TemplateInfo } from "communication-types/src/AppTemplates";

import type { ShinyUiParentNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

const navbarTree: ShinyUiParentNode = {
  id: "grid_page",
  namedArgs: {
    row_sizes: ["70px", "1fr", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
    layout: ["header header", "sidebar linePlots", "dists dists"],
  },
  children: [
    {
      id: "grid_card",
      namedArgs: { area: "sidebar" },
      children: [
        {
          id: "card_header",
          namedArgs: {},
          children: [{ id: "textNode", namedArgs: { contents: "Settings" } }],
        },
        {
          id: "card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "sliderInput",
              namedArgs: {
                inputId: "numChicks",
                label: "Number of Chicks",
                min: 1,
                max: 15,
                value: 5,
                width: "100%",
                step: 1,
              },
            },
            {
              id: "radioButtons",
              namedArgs: {
                inputId: "distFacet",
                label: "Facet Distribution By",
                choices: {
                  "Diet Type": "Diet",
                  "Measure Time": "Time",
                },
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
        content: "Chick Weights",
        alignment: "center",
        is_title: false,
      },
    },
    {
      id: "grid_card_plot",
      namedArgs: {
        area: "dists",
      },
    },
    {
      id: "grid_card_plot",
      namedArgs: {
        area: "linePlots",
      },
    },
  ],
};

export const chickWeightsGridTemplate: TemplateInfo = {
  title: "Chick Weights Grid",
  description: "Plots investigating the ChickWeights built-in dataset",
  uiTree: navbarTree,
  otherCode: {
    serverLibraries: ["ggplot2"],
    serverFunctionBody: ` 
output$linePlots <- renderPlot({
  obs_to_include <- as.integer(ChickWeight$Chick) <= input$numChicks
  chicks <- ChickWeight[obs_to_include, ]

  ggplot(
    chicks,
    aes(
      x = Time,
      y = weight,
      group = Chick
    )
  ) +
    geom_line(alpha = 0.5) +
    ggtitle("Chick weights over time")
})

output$dists <- renderPlot({
  ggplot(
    ChickWeight,
    aes(x = weight)
  ) +
    facet_wrap(input$distFacet) +
    geom_density(fill = "#fa551b", color = "#ee6331") +
    ggtitle("Distribution of weights by diet")
})`,
  },
};
