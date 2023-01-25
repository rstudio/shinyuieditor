library(plotly)
library(shiny)
library(gridlayout)
library(DT)

# Here's a comment about this app

ui <- grid_page(
  layout = c(
    "header  header  ",
    "sidebar area4   ",
    "table   bluePlot",
    "table   bluePlot"
  ),
  row_sizes = c(
    "125px",
    "1fr",
    "1fr",
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
  grid_card(
    area = "table",
    item_alignment = "center",
    title = "Table",
    scrollable = TRUE,
    item_gap = "12px",
    DTOutput(
      outputId = "myTable",
      width = "100%"
    )
  ),
  grid_card_plot(area = "bluePlot"),
  grid_card(
    area = "area4",
    plotlyOutput(
      outputId = "distPlot",
      width = "100%",
      height = "100%"
    )
  )
)


other_ui <- "hello there"

# Define server logic required to draw a histogram
server <- function(input, output) {

  output$distPlot <- renderPlotly({
    # generate bins based on input$bins from ui.R
    plot_ly(x = ~faithful[, 2], type = "histogram")

    # # draw the histogram with the specified number of bins
    # hist(x, breaks = bins, col = 'darkgray', border = 'white')
  })

  output$bluePlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'steelblue', border = 'white')
  })


  output$myTable <- renderDT(
    {
      head(faithful, 10)
    }
  )
}

shinyApp(ui, server)

