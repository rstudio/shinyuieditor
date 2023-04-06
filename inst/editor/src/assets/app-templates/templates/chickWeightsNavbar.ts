import type { TemplateInfo } from "communication-types/src/AppTemplates";

import type { ShinyUiNode } from "../../../main";

const navbarTree: ShinyUiNode = {
  id: "shiny::navbarPage",
  namedArgs: {
    title: "Chick Weights",
    selected: "Line Plots",
    collapsible: true,
    theme: {
      id: "unknownUiFunction",
      namedArgs: {
        text: "bslib::bs_theme()",
      },
    },
  },
  children: [
    {
      id: "shiny::tabPanel",
      namedArgs: {
        title: "Line Plots",
      },
      children: [
        {
          id: "gridlayout::grid_container",
          namedArgs: {
            row_sizes: ["1fr"],
            col_sizes: ["250px", "1fr"],
            gap_size: "10px",
            layout: ["num_chicks linePlots"],
          },
          children: [
            {
              id: "gridlayout::grid_card",
              namedArgs: { area: "num_chicks" },
              children: [
                {
                  id: "bslib::card_header",
                  namedArgs: {},
                  children: [
                    {
                      id: "textNode",
                      namedArgs: { contents: "Settings" },
                    },
                  ],
                },
                {
                  id: "bslib::card_body_fill",
                  namedArgs: {},
                  children: [
                    {
                      id: "shiny::sliderInput",
                      namedArgs: {
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
              id: "gridlayout::grid_card_plot",
              namedArgs: {
                area: "linePlots",
              },
            },
          ],
        },
      ],
    },
    {
      id: "shiny::tabPanel",
      namedArgs: {
        title: "Distributions",
      },
      children: [
        {
          id: "gridlayout::grid_container",
          namedArgs: {
            row_sizes: ["165px", "1fr"],
            col_sizes: ["1fr"],
            gap_size: "10px",
            layout: ["facetOption", "dists"],
          },
          children: [
            {
              id: "gridlayout::grid_card_plot",
              namedArgs: {
                area: "dists",
              },
            },
            {
              id: "gridlayout::grid_card",
              namedArgs: {
                area: "facetOption",
              },
              children: [
                {
                  id: "bslib::card_header",
                  namedArgs: {},
                  children: [
                    {
                      id: "textNode",
                      namedArgs: { contents: "Distribution Plot Options" },
                    },
                  ],
                },
                {
                  id: "bslib::card_body_fill",
                  namedArgs: {},
                  children: [
                    {
                      id: "shiny::radioButtons",
                      namedArgs: {
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
