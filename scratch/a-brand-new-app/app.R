library(shiny)
library(ggplot2)
library(bslib)
library(gridlayout)

ui <- page_navbar(
  title = "Chick Weights",
  collapsible = TRUE,
  theme = bslib::bs_theme(),
  sidebar = sidebar(
    title = "Settings",
    "Find me at ",
    a(href="www.google.com", "my website"),
    " for more infomation!",
    markdown(
      mds = c(
        "hello _world_"
      )
    )
  ),
  selected = "Distributions",
  tabPanel(
    title = "Distributions",
    grid_container(
      layout = c(
        "facetOption",
        "dists      "
      ),
      row_sizes = c(
        "420px",
        "1fr"
      ),
      col_sizes = c(
        "1fr"
      ),
      gap_size = "10px",
      grid_card_plot(area = "dists"),
      grid_card(
        area = "facetOption",
        card_header("Distribution Plot Options"),
        card_body(
          radioButtons(
            inputId = "distFacet",
            label = "Facet distribution by",
            choices = list("Diet Option" = "Diet", "Measure Time" = "Time")
          ),
          value_box(
            title = "Look at me!",
            value = textOutput(outputId = "textOutput")
          )
        )
      )
    )
  ),
  tabPanel(
    title = "Line Plots",
    grid_container(
      layout = c(
        "linePlots"
      ),
      gap_size = "10px",
      col_sizes = c(
        "1fr"
      ),
      row_sizes = c(
        "1fr"
      ),
      grid_card_plot(area = "linePlots")
    )
  )
)


server <- function(input, output) {

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

}

shinyApp(ui, server)


