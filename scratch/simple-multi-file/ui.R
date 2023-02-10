library(shiny)
library(gridlayout)
  
ui <- grid_page(
  layout = c(
    "A"
  ),
  row_sizes = c(
    "1fr"
  ),
  col_sizes = c(
    "1fr"
  ),
  gap_size = "10px",
  grid_card(area = "A")
)
