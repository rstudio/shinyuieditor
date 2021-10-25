
my_layout <- gridlayout::new_gridlayout("
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |plot   |")


app_expr <- rlang::expr(
  gridlayout::grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    header = gridlayout::title_panel("This is my header"),
    sidebar = gridlayout::grid_panel(
      title = "Settings",
      shiny::sliderInput("bins","Number of bins:", min = 1, value = 5, max = 10)
    ),
    plot = shiny::plotOutput("distPlot")
  )
)


lobstr::tree(parse_ui_fn(app_expr))
