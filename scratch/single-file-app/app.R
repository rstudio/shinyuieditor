library(shiny)
library(gridlayout)

# Here's a comment about this app

ui <- grid_page(
  layout = c(
    "header  header  ",
    "sidebar bluePlot",
  ),
  row_sizes = c(
    "125px",
    "1fr"
  ),
  col_sizes = c(
    "735px",
    "1fr"
  ),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    item_alignment = "top",
    title = "Settings",
    item_gap = "12px",
    sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 12L,
      max = 100L,
      value = 30L,
      animate = animationOptions(
        interval = 1000,
        loop = FALSE,
        playButton = "play",
        pauseButton = "pause"
      ),
      width = "100%"
    )
  ),
  grid_card_text(
    area = "header",
    content = "Single File App",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card_plot(area = "bluePlot"),
)

other_ui <- "hello there"

# Define server logic required to draw a histogram
server <- function(input, output) {

  output$bluePlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'steelblue', border = 'white')
  })

}

shinyApp(ui, server)
