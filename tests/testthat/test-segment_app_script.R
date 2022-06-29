start_app_code <- 'library(shiny)
library(gridlayout)

# A comment about this app
ui <- grid_page(
  layout = c(
    "header",
    "distPlot"
  ),
  grid_panel_text(
    area = "header",
    content = "Single File App",
    h_align = "start",
    is_title = FALSE
  ),
  grid_card_plot(area = "distPlot")
)


geyser_data <- faithful[, 2]
nbins <- 30

# Define server logic required to draw a histogram
server <- function(input, output) {

  output$distPlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    bins <- seq(min(geyser_data), max(geyser_data), length.out = nbins + 1)

    # draw the histogram with the specified number of bins
    hist(geyser_data, breaks = bins, col = "darkgray", border = "white")
  })
}

shinyApp(ui, server)
'
start_app_lines <- strsplit(start_app_code, "\n")[[1]]


test_that("Can properly locate ui definition", {
  start_app_info <- get_file_ui_definition_info(start_app_lines)

  expect_equal(
    start_app_info$ui_bounds,
    list(start = 5L, end = 17L)
  )

  expect_equal(
    start_app_info$loaded_libraries,
    c("shiny", "gridlayout")
  )
})


new_ui_text <- 'grid_page(
  layout = c(
    "title",
    "histogram"
  ),
  grid_panel_text(
    area = "title",
    content = "A new title",
    is_title = FALSE
  ),
  grid_card_plot(area = "histogram")
)'
