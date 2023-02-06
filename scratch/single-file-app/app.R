library(shiny)
library(gridlayout)

# Here's a comment about this app
ui <- grid_page(
  layout = c(
    "header  header   ",
    "sidebar bluePlot2",
    "sidebar redPlot  "
  ),
  row_sizes = c(
    "175px",
    "0.46fr",
    "1.54fr"
  ),
  col_sizes = c(
    "425px",
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
      label = "Number of Bins ",
      min = 12,
      max = 100,
      value = 30,
      width = "100%"
    ),
    actionButton(inputId = "redraw", label = "Redraw"),
    textInput(
      inputId = "bins2",
      label = "Text Input",
      value = ""
    )
  ),
  grid_card_text(
    area = "header",
    content = "Single File App",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card_plot(area = "bluePlot2"),
  grid_card_plot(area = "redPlot")
)

other_ui <- "hello there"

# Define server logic required to draw a histogram
server <- function(input, output) {

  output$redPlot <- renderPlot({
    print(input$bins2)
    print(input$bins)
    # draw the histogram with the specified number of bins
    hist(rnorm(100), col = 'orangered')
  })

  output$bluePlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'steelblue', border = 'white')
  })

  observe({
    output$redPlot <- renderPlot({
      hist(rnorm(100), col = 'orangered')
    })
  }) %>% bindEvent(input$redraw)

  output$bluePlot2 <- renderPlot({
    #Plot code goes here
    plot(rnorm(100))
  })
}

shinyApp(ui, server)
