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
  gap_size = "1rem",
  gridlayout::grid_panel_stack(
    area = "sidebar",
    item_alignment = "top",
    item_gap = "12px",
    title = "Settings",
    shiny::numericInput(
      inputId = "myNumericInput",
      label = "Numeric Input",
      value = 10L
    ),
    shiny::sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 5L,
      max = 100L,
      value = 30L,
      width = "100%",
      step = 1L
    )
  ),
  gridlayout::grid_panel_text(
    area = "header",
    content = "Text from Chooser",
    h_align = "start",
    is_title = FALSE
  ),
  gridlayout::grid_panel_stack(
    area = "table",
    item_alignment = "center",
    item_gap = "12px",
    title = "Table",
    scrollable = TRUE,
    gt::gt_output("stockTable")
  ),
  gridlayout::grid_panel_plot(area = "bluePlot"),
  gridlayout::grid_panel_plot(area = "distPlot")
)
