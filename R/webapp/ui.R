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
      inputId = "slider1",
      label = "my slider is cool",
      min = "1",
      max = "10",
      value = "7"
    ),
    shiny::sliderInput(
      inputId = "slider3",
      min = "2",
      max = "10",
      value = "5"
    )
  ),
  gridlayout::grid_panel(
    area = "plot",
    shiny::plotOutput(outputId = "distPlot")
  )
)
