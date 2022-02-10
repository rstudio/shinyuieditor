gridlayout::grid_page(
  layout = "
    |2rem  |200px   |1fr    |
    |80px  |header  |header |
    |1fr   |sidebar |plot   |",
  gridlayout::title_panel(
    "header",
    title = "My App Title from R"
  ),
  gridlayout::grid_panel(
    "sidebar",
    shiny::sliderInput(inputId="slider1", label="my slider is cool", min="1", max="10", value="7"),
    shiny::sliderInput(inputId="slider3", min="2", max="10", value="5")
  ),
  gridlayout::grid_panel(
    "plot",
    shiny::plotOutput("distPlot")
  )
)
