gridlayout::grid_page(
  layout = "
| 2rem | 200px   | 1fr    |
|------|---------|--------|
| 80px | header  | header |
| 1fr  | sidebar |  plot  |",
  gridlayout::title_panel(
    area = "header",
    title = "This is a new app title"
  ),
  gridlayout::grid_panel(
    area = "sidebar",
    title = "My Sidebar",
    verticalAlign = "spread",
    horizontalAlign = "spread",
    shiny::sliderInput(
      inputId = "slider",
      label = "Slider",
      min = 0L,
      value = 5L,
      max = 10L
    )
  ),
  gridlayout::grid_panel(
    area = "plot",
    shiny::plotOutput(outputId = "plot"),
    shiny::plotOutput(outputId = "plot")
  ),
  gridlayout::grid_panel(
    area = "plot2",
    horizontalAlign = "spread",
    verticalAlign = "spread"
  )
)
