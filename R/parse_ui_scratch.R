
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

full_call <- rlang::expr(
  my_pkg::test_page(a = 1)
)

uncalled_fn <- rlang::expr(
  my_pkg::test_page
)
uncalled_long_pkg_fn <- rlang::expr(
  my_pkgaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa::test_pageaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa()
)

function_factory <- rlang::expr(
  build_a_func()(1 + 2)
)
x <- function_factory

called_fn_name(function_factory)
is_known_ui_fn(uncalled_long_pkg_fn)


plain_var <- rlang::expr(
  an_undefined_var
)

length(full_call[[1]])
length(uncalled_fn[[1]])
length(plain_var[[1]])

is.symbol(full_call)
is.symbol(uncalled_fn)
is.symbol(plain_var)

is.language(full_call)
is.language(uncalled_fn)
is.language(plain_var)


is_known_ui_fn(full_call)

is_known_ui_fn(rlang::expr(
  my_pkg::test_page
))

is_known_ui_fn(rlang::expr(
  an_undefined_var
))
lobstr::tree(parse_ui_fn(app_expr))

lobstr::tree(parse_ui_fn(rlang::expr(gridlayout::grid_page(
  layout = "|2rem |1fr    |
            |80px |header |
            |1fr  |plot   |",
  header = gridlayout::title_panel("This is my header"),
  plot = shiny::plotOutput("distPlot"),
  unknown = shinywidgets::my_widget(a = 1, my_text = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", my_text2 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
))))
ui <- gridlayout::grid_page(
  layout = "|2rem |1fr    |
            |80px |header |
            |1fr  |plot   |",
  header = gridlayout::title_panel("This is my header"),
  plot = shiny::plotOutput("distPlot")
)
