library(shiny)
library(ggplot2)

# Chick weights investigated over three panels
ui <- navbarPage(
  title = "Geysers",
  theme = bslib::bs_theme(),
  tabPanel(
    title = "Settings",
    sliderInput(
      inputId = "numChicks",
      label = "Number of Bins",
      min = 1L,
      max = 15L,
      value = 4L,
      step = 1L,
      width = "400px"
    )
  ),
  tabPanel(
    title = "Weights over time",
    plotOutput(
      outputId = "linePlots",
      width = "100%",
      height = "400px"
    )
  ),
  tabPanel(
    title = "Weight By Diet",
    plotOutput(
      outputId = "dists",
      width = "100%",
      height = "400px"
    )
  )
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

