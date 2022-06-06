#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#
library(shiny)
library(gt)


table_data <- head(sp500, 10)

# Define server logic required to draw a histogram
function(input, output) {

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

