gridlayout::grid_page(
  layout = "
| 1rem  | 250px   | 1fr    |
|-------|---------|--------|
| 100px | header  | header |
| 1fr   | sidebar |  blue  |
| 1fr   | sidebar |  plot  |",
  gridlayout::title_panel(
    title = "My App",
    area = "header"
  ),
  gridlayout::vertical_stack_panel(
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
  gridlayout::vertical_stack_panel(
    area = "plot",
    item_alignment = "center",
    item_gap = "12px",
    shiny::plotOutput(
      outputId = "bluePlot",
      width = "100%",
      height = "400px"
    )
  ),
  gridlayout::vertical_stack_panel(
    area = "blue",
    item_alignment = "center",
    item_gap = "12px",
    title = "Blue Plot",
    shiny::plotOutput(
      outputId = "distPlot",
      width = "100%",
      height = "400px"
    )
  )
)
