gridlayout::grid_page(
  layout = "
| 2rem | 350px   | 1fr    |
|------|---------|--------|
| 80px | header  | header |
| 1fr  | sidebar |  plot  |",
  gridlayout::title_panel(
    area = "header",
    title = "My App Title from Javascript"
  ),
  gridlayout::grid_panel(
    area = "sidebar",
    shiny::sliderInput(
      inputId = "slider2",
      label = "First Slider",
      min = 0L,
      max = 10L,
      value = 5L
    ),
    shiny::sliderInput(
      inputId = "slider2",
      label = "Second Slider",
      min = 0L,
      max = 10L,
      value = 5L
    )
  ),
  gridlayout::grid_panel(
    area = "plot",
    shiny::plotOutput(outputId = "distPlot")
  )
)
