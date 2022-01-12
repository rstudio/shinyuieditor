gridlayout::grid_page(
  layout = "
    | 2rem  | 250px   | 1fr    |
    |-------|---------|--------|
    | 113px | header  | header |
    | 1fr   | sidebar |  plot  |",
  header = gridlayout::title_panel(title="This is my header"),
  plot = shiny::plotOutput(outputId="distPlot"),
  sidebar = shiny::sliderInput(inputId="numBins", min="5", max="10", value="7")
)
