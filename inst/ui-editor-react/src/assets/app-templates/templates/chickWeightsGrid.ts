import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type { TemplateInfo } from "../app_templates";

const navbarTree = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    row_sizes: ["70px", "1fr", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
    areas: [
      ["header", "header"],
      ["sidebar", "dists"],
      ["linePlots", "linePlots"],
    ],
  },
  uiChildren: [
    {
      uiName: "gridlayout::grid_card",
      uiArguments: {
        area: "sidebar",
        title: "Settings",
        item_gap: "12px",
      },
      uiChildren: [
        {
          uiName: "shiny::numericInput",
          uiArguments: {
            inputId: "numChicks",
            label: "Number of chicks",
            value: 10,
            min: 1,
            max: 25,
            step: 1,
            width: "100%",
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_card_text",
      uiArguments: {
        area: "header",
        content: "Chick Weights",
        alignment: "center",
        is_title: false,
      },
    },
    {
      uiName: "gridlayout::grid_card_plot",
      uiArguments: {
        area: "dists",
      },
    },
    {
      uiName: "gridlayout::grid_card_plot",
      uiArguments: {
        area: "linePlots",
      },
    },
  ],
};

export const chickWeightsGridTemplate: TemplateInfo = {
  title: "Chick Weights Grid",
  description: "Plots investigating the ChickWeights built-in dataset",
  uiTree: navbarTree as ShinyUiNode,
  otherCode: {
    serverFunctionBody: ` 
    output$linePlots <- renderPlot({
      obs_to_include <- as.integer(ChickWeight$Chick) <= input$numChicks
      chicks <- ChickWeight[obs_to_include,]
  
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
        facet_wrap(~Diet) +
        geom_density(fill = "#fa551b", color = "#ee6331") +
        ggtitle("Distribution of weights by diet")
    })`,
  },
};
