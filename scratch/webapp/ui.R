gridlayout::grid_page(
  layout = c(
    "header header",
    "sidebar blueplot",
    "sidebar plot"
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
    ),
    DT::DTOutput("my-table",
      width = "90%"
    )
  ),
  gridlayout::grid_panel_stack(
    area = "plot",
    item_alignment = "center",
    item_gap = "12px",
    shiny::plotOutput(
      outputId = "bluePlot",
      width = "100%",
      height = "400px"
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
  )
)
