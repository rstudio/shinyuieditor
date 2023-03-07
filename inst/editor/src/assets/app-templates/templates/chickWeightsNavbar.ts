import type { TemplateInfo } from "communication-types/src/AppTemplates";

import type { ShinyUiNode } from "../../../main";

const navbarTree: ShinyUiNode = {
  uiName: "shiny::navbarPage",
  uiArguments: {
    title: "Chick Weights",
    selected: "Line Plots",
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
        title: "Line Plots",
      },
      uiChildren: [
        {
          uiName: "gridlayout::grid_container",
          uiArguments: {
            row_sizes: ["1fr"],
            col_sizes: ["250px", "1fr"],
            gap_size: "10px",
            layout: ["num_chicks linePlots"],
          },
          uiChildren: [
            {
              uiName: "gridlayout::grid_card",
              uiArguments: { area: "num_chicks" },
              uiChildren: [
                {
                  uiName: "bslib::card_header",
                  uiArguments: {},
                  uiChildren: [
                    {
                      uiName: "textNode",
                      uiArguments: { contents: "Settings" },
                    },
                  ],
                },
                {
                  uiName: "bslib::card_body_fill",
                  uiArguments: {},
                  uiChildren: [
                    {
                      uiName: "shiny::sliderInput",
                      uiArguments: {
                        inputId: "numChicks",
                        label: "Number of chicks",
                        min: 1,
                        max: 15,
                        value: 5,
                        step: 1,
                        width: "100%",
                      },
                    },
                  ],
                },
              ],
            },
            {
              uiName: "gridlayout::grid_card_plot",
              uiArguments: {
                area: "linePlots",
              },
            },
          ],
        },
      ],
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: {
        title: "Distributions",
      },
      uiChildren: [
        {
          uiName: "gridlayout::grid_container",
          uiArguments: {
            row_sizes: ["165px", "1fr"],
            col_sizes: ["1fr"],
            gap_size: "10px",
            layout: ["facetOption", "dists"],
          },
          uiChildren: [
            {
              uiName: "gridlayout::grid_card_plot",
              uiArguments: {
                area: "dists",
              },
            },
            {
              uiName: "gridlayout::grid_card",
              uiArguments: {
                area: "facetOption",
              },
              uiChildren: [
                {
                  uiName: "bslib::card_header",
                  uiArguments: {},
                  uiChildren: [
                    {
                      uiName: "textNode",
                      uiArguments: { contents: "Distribution Plot Options" },
                    },
                  ],
                },
                {
                  uiName: "bslib::card_body_fill",
                  uiArguments: {},
                  uiChildren: [
                    {
                      uiName: "shiny::radioButtons",
                      uiArguments: {
                        inputId: "distFacet",
                        label: "Facet distribution by",
                        choices: {
                          "Diet Option": "Diet",
                          "Measure Time": "Time",
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
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
})
`,
  },
};
