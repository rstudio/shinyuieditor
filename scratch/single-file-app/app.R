library(shiny)
library(gridlayout)

# Here's a comment about this app
ui <- grid_page(
  layout = c(
    "header  header  ",
    "sidebar bluePlot",
    "sidebar redPlot "
  ),
  row_sizes = c(
    "110px",
    "0.76fr",
    "1.24fr"
  ),
  col_sizes = c(
    "330px",
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
      width = "100%"
    ),
    actionButton(
      inputId = "redraw",
      label = "Redraw2"
    )
  ),
  grid_card_text(
    area = "header",
    content = "Single File App",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card_plot(area = "bluePlot"),
  grid_card_plot(area = "redPlot")
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

  output$redPlot <- renderPlot({
    # draw the histogram with the specified number of bins
    hist(rnorm(100), col = 'orangered')
  })

  observe({
    output$redPlot <- renderPlot({
      hist(rnorm(100), col = 'orangered')
    })
  }) %>% bindEvent(input$redraw)

}

shinyApp(ui, server)
