gridlayout::grid_page(
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
  col_sizes = c(
    "250px",
    "1fr"
  ),
  gap_size = "10px",
  gridlayout::grid_card(
    area = "sidebar",
    item_alignment = "top",
    item_gap = "12px",
    title = "Settings",
    shiny::sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 15L,
      max = 100L,
      value = 30L,
      width = "100%",
      step = 1L
    )
  ),
  gridlayout::grid_card_text(
    area = "header",
    content = "Text from Chooser",
    h_align = "start",
    is_title = FALSE
  ),
  gridlayout::grid_card(
    area = "table",
    item_alignment = "center",
    item_gap = "12px",
    title = "Table",
    scrollable = TRUE,
    gt::gt_output("stockTable")
  ),
  gridlayout::grid_card_plot(area = "bluePlot"),
  gridlayout::grid_card_plot(area = "distPlot")
)
