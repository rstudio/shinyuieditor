gridlayout::grid_page(
  layout = "
| 1rem  | 250px   | 1fr      |
|-------|---------|----------|
| 100px | header  |  header  |
| 1fr   | sidebar | bluePlot |
| 1fr   | sidebar |   plot   |",
  gridlayout::grid_panel_text(
    area = "header",
    title = "Geysers!"
  ),
  gridlayout::grid_panel_stack(
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
  gridlayout::grid_panel_stack(
    area = "plot",
    item_alignment = "center",
    shiny::plotOutput(outputId = "distPlot")
  ),
  gridlayout::grid_panel_stack(
    area = "bluePlot",
    item_alignment = "center",
    shiny::plotOutput(outputId = "bluePlot")
  )
)
