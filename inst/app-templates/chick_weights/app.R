library(shiny)
library(gridlayout)
library(ggplot2)

# App template from the shinyuieditor
ui <- grid_page(
  layout = c(
    "header header",
    "sidebar dists",
    "linePlots linePlots"
  ),
  row_sizes = c(
    "70px",
    "1fr",
    "1fr"
  ),
  col_sizes = c(
    "250px",
    "1fr"
  ),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    item_alignment = "top",
    title = "Settings",
    item_gap = "12px",
    numericInput(
      inputId = "numChicks",
      label = "Number of bins",
      value = 10L,
      min = 1L,
      max = 25L,
      step = 1L,
      width = "100%"
    )
  ),
  grid_card_text(
    area = "header",
    content = "Chick Weights",
    alignment = "center",
    is_title = FALSE
  ),
  grid_card_plot(area = "dists"),
  grid_card_plot(area = "linePlots")
)

# Define server logic
server <- function(input, output) {
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
  })
}

shinyApp(ui, server)
