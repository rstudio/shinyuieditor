gridlayout::grid_page(
  layout = c(
    "header header",
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
  gridlayout::grid_panel_text(
    area = "header",
    content = "Geysers!",
    h_align = "start",
    is_title = TRUE
  ),
  gridlayout::grid_card(
    area = "sidebar",
    item_alignment = "top",
    item_gap = "12px",
    shiny::sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 5L,
      max = 50L,
      value = 20L,
      width = "100%"
    )
  ),
  gridlayout::grid_card_plot(area = "distPlot"),
  gridlayout::grid_card_plot(area = "bluePlot")
)
