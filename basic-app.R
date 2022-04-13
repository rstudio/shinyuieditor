# The geyser app... but in grid!

library(gridlayout)
library(shiny)

my_layout <- new_gridlayout("
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |plot   |")


# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    use_bslib_card_styles = TRUE,
    header = title_panel("This is my header"),
    sidebar = grid_panel(
      title = "Settings",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    plot = plotOutput("distPlot")
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
app
