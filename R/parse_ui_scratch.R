
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

is_called_fn <- function(x){
  if (!rlang::is_call(x)) return(FALSE)

  # Make sure the call isn't just the namespace operator
  if(identical(rlang::call_fn(x), base::`::`)){
    return(rlang::is_call(x[[3]]))
  }

  TRUE
}


lobstr::tree(parse_ui_fn(app_expr))

lobstr::tree(parse_ui_fn(gridlayout::grid_page(
  layout = "|2rem |1fr    |
            |80px |header |
            |1fr  |plot   |",
  header = gridlayout::title_panel("This is my header"),
  plot = shiny::plotOutput("distPlot")
)))
ui <- gridlayout::grid_page(
  layout = "|2rem |1fr    |
            |80px |header |
            |1fr  |plot   |",
  header = gridlayout::title_panel("This is my header"),
  plot = shiny::plotOutput("distPlot")
)
