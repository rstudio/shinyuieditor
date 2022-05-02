gridlayout::grid_page(
  layout = c(
    "header header",
    "sidebar blueplot",
    "sidebar table",
    "sidebar plot"
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
    item_alignment = "center",
    item_gap = "12px",
    title = "Settings",
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
  gridlayout::grid_panel(
    area = "plot",
    verticalAlign = "center",
    horizontalAlign = "center",
    item_alignment = "center",
    title = "grid_panel()",
    shiny::plotOutput(
      outputId = "bluePlot",
      width = "100%",
      height = "100%"
    )
  ),
  gridlayout::grid_panel_stack(
    area = "blueplot",
    item_alignment = "center",
    item_gap = "12px",
    title = "Blue Plot",
    shiny::plotOutput(
      outputId = "distPlot",
      width = "100%",
      height = "400px"
    )
  ),
  gridlayout::grid_panel_text(
    content = "Text from Chooser",
    h_align = "start",
    area = "header",
    is_title = FALSE
  ),
  gridlayout::grid_panel_stack(
    area = "table",
    item_alignment = "center",
    item_gap = "12px",
    title = "Table",
    scrollable = TRUE,
    gt::gt_output("stockTable")
  )
)
