gridlayout::grid_page(
  layout = "
| 1rem  | 250px   | 1fr      |
|-------|---------|----------|
| 100px | header  |  header  |
| 1fr   | sidebar | bluePlot |
| 1fr   | sidebar |   plot   |",
  gridlayout::title_panel(
    area = "header",
    title = "Geysers!"
  ),
  gridlayout::vertical_stack_panel(
    area = "sidebar",
    item_alignment = "center",
    shiny::sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 5L,
      max = 50L,
      value = 20L
    )
  ),
  gridlayout::vertical_stack_panel(
    area = "plot",
    item_alignment = "center",
    shiny::plotOutput(outputId = "distPlot")
  ),
  gridlayout::vertical_stack_panel(
    area = "bluePlot",
    item_alignment = "center",
    shiny::plotOutput(outputId = "bluePlot")
  )
)
