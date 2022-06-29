library(shiny)
library(gridlayout)
library(gt)

# Here's a comment about this app


ui <- grid_page(
  layout = c(
    "header header",
    "sidebar distPlot",
    "sidebar table",
    "sidebar bluePlot"
  ),
  row_sizes = c(
    "100px",
    "1fr",
    "1fr",
    "1fr"
  ),
  col_sizes = c("250px","1fr"),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    item_alignment = "top",
    item_gap = "12px",
    title = "Settings",
    sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 12L,
      max = 100L,
      value = 30L,
      width = "100%",
      animate = animationOptions(
        interval = 1000,
        loop = FALSE,
        playButton = "play",
        pauseButton = "pause"
      )
    )
  ),
  grid_panel_text(
    area = "header",
    content = "Single File App",
    h_align = "start",
    is_title = FALSE
  ),
  grid_card(
    area = "table",
    item_alignment = "center",
    item_gap = "12px",
    title = "Table",
    scrollable = TRUE,
    gt::gt_output("stockTable")
  ),
  grid_card_plot(area = "bluePlot"),
  grid_card_plot(area = "distPlot")
)


other_ui <- "hello there"
table_data <- head(sp500, 10)

# Define server logic required to draw a histogram
server <- function(input, output) {

  output$distPlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'darkgray', border = 'white')
  })

  output$bluePlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'steelblue', border = 'white')
  })


  output$stockTable <- render_gt(
    {
      # Define the start and end dates for the data range
      start_date <- "2010-06-07"
      end_date <- "2010-06-14"

      # Create a gt table based on preprocessed
      # `sp500` table data
      gt(table_data) %>%
        tab_header(
          title = "S&P 500",
          subtitle = glue::glue("{start_date} to {end_date}")
        ) %>%
        fmt_date(
          columns = date,
          date_style = 3
        ) %>%
        fmt_currency(
          columns = c(open, high, low, close),
          currency = "USD"
        ) %>%
        fmt_number(
          columns = volume,
          suffixing = TRUE
        )
    },
    width = "100%",
    height  = "100%"
  )
}

shinyApp(ui, server)

