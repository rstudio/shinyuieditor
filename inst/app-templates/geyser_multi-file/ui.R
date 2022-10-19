library(gridlayout)
library(shiny)
grid_page(
  layout = c(
    "header  header  ",
    "sidebar bluePlot",
    "sidebar distPlot"
  ),
  row_sizes = c(
    "100px",
    "1fr",
    "1fr"
  ),
  col_sizes = c(
    "250px",
    "1fr"
  ),
  gap_size = "15px",
  grid_card_text(
    content = "Geysers!",
    alignment = "start",
    area = "header",
    h_align = "start",
    is_title = TRUE
  ),
  grid_card(
    area = "sidebar",
    item_gap = "12px",
    sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 5L,
      max = 50L,
      value = 20L,
      width = "100%"
    )
  ),
  grid_card_plot(area = "distPlot"),
  grid_card_plot(area = "bluePlot")
)
