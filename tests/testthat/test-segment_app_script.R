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
  grid_panel_plot(area = "distPlot")
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
  grid_panel_plot(area = "histogram")
)'


test_that("Can replace existing ui definition", {

  start_app_info <- get_file_ui_definition_info(start_app_lines)

  expect_false(
    grepl(
      x = paste(start_app_lines, collapse = "\n"),
      pattern = new_ui_text,
      fixed = TRUE
    )
  )

  new_app_lines <- replace_ui_definition(
    start_app_info,
    new_ui_text,
    ui_libraries = c("shiny", "gt", "gridlayout")
  )

  expect_true(
    grepl(
      x = paste(new_app_lines, collapse = "\n"),
      pattern = paste("ui <-", new_ui_text),
      fixed = TRUE
    )
  )

  # Previously unloaded library should be added to the head of the file
  expect_true(
    length(grep(x = new_app_lines, pattern = "library(gt)", fixed = TRUE)) == 1L
  )

  # Already present libraries should _not_ be added again
  expect_true(
    length(grep(x = new_app_lines, pattern = "library(shiny)", fixed = TRUE)) == 1L
  )
  expect_true(
    length(grep(x = new_app_lines, pattern = "library(gridlayout)", fixed = TRUE)) == 1L
  )
})


