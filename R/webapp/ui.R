gridlayout::grid_page(
  layout = "
| 2rem | 350px   | 1fr    |
|------|---------|--------|
| 80px | header  | header |
| 1fr  | sidebar |  plot  |",
  gridlayout::title_panel(
    area = "header",
    title = "My App Title from R3"
  ),
  gridlayout::grid_panel(
    area = "sidebar",
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
    shiny::plotOutput(outputId = "distPlot")
  )
)
