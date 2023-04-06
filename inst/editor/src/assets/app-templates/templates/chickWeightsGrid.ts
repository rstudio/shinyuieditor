import type { TemplateInfo } from "communication-types/src/AppTemplates";

import type { ShinyUiParentNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

const navbarTree: ShinyUiParentNode = {
  id: "gridlayout::grid_page",
  uiArguments: {
    row_sizes: ["70px", "1fr", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
    layout: ["header header", "sidebar linePlots", "dists dists"],
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
            { id: "textNode", uiArguments: { contents: "Settings" } },
          ],
        },
        {
          id: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [
            {
              id: "shiny::sliderInput",
              uiArguments: {
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
              id: "shiny::radioButtons",
              uiArguments: {
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
      id: "gridlayout::grid_card_text",
      uiArguments: {
        area: "header",
        content: "Chick Weights",
        alignment: "center",
        is_title: false,
      },
    },
    {
      id: "gridlayout::grid_card_plot",
      uiArguments: {
        area: "dists",
      },
    },
    {
      id: "gridlayout::grid_card_plot",
      uiArguments: {
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
