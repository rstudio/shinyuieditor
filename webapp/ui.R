gridlayout::grid_page(
  layout = "
| 1rem  | 250px   | 1fr    |
|-------|---------|--------|
| 100px | header  | header |
| 1fr   | sidebar |  blue  |
| 1fr   | sidebar |  plot  |",
  gridlayout::title_panel(
    area = "header",
    title = "My App"
  ),
  gridlayout::vertical_stack_panel(
    area = "sidebar",
    item_alignment = "center",
    shiny::sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 5L,
      max = 100L,
      value = 30L,
      step = 5L
    )
  ),
  gridlayout::vertical_stack_panel(
    area = "plot",
    item_alignment = "center",
    shiny::plotOutput(outputId = "distPlot")
  ),
  gridlayout::vertical_stack_panel(
    area = "blue",
    item_alignment = "center",
    shiny::plotOutput(
      outputId = "bluePlot",
      width = "100%",
      height = "400px"
    )
  )
)
