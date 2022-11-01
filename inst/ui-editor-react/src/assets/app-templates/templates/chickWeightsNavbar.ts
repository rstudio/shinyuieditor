import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type { TemplateInfo } from "../app_templates";

const navbarTree = {
  uiName: "shiny::navbarPage",
  uiArguments: {
    title: "Chick Weights",
    selected: "Settings",
    collapsible: true,
    theme: {
      uiName: "unknownUiFunction",
      uiArguments: {
        text: "bslib::bs_theme()",
      },
    },
  },
  uiChildren: [
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Settings",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "numChicks",
            label: "Number of Bins",
            min: 1,
            max: 15,
            value: 4,
            step: 1,
            width: "100%",
          },
        },
      ],
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Line Plot",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "linePlots",
            width: "100%",
            height: "500px",
          },
        },
      ],
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Dist Plot",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "dists",
            width: "100%",
            height: "500px",
          },
        },
      ],
    },
  ],
};

export const chickWeightsNavbar: TemplateInfo = {
  title: "Chick Weights navbar",
  description:
    "Plots investigating the ChickWeights built-in dataset in a `navbarPage()` view",
  uiTree: navbarTree as ShinyUiNode,
  otherCode: {
    serverLibraries: ["ggplot2"],
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
